(() => {
  const PYODIDE_BASE = 'https://cdn.jsdelivr.net/pyodide/v314.0.5/full/';
  const SQLJS_BASE = 'https://sql.js.org/dist/';

  const pythonDefault = `trips = [
    {"city": "Hokkaido", "days": 7, "budget": 42000},
    {"city": "Tokyo", "days": 5, "budget": 28000},
    {"city": "Chiang Mai", "days": 4, "budget": 18000}
]

for trip in trips:
    if trip["days"] > 5:
        print(trip["city"])`;

  const sqlDefault = `SELECT city, days, budget
FROM trips
WHERE days > 5;`;

  const pythonChallenges = [
    '把 <code>&gt; 5</code> 改成 <code>&gt;= 5</code>。哪個城市會多出來？',
    '試著把條件改成 <code>budget &lt; 30000</code>。你預期會看到哪兩個地方？',
    '把 <code>print(trip["city"])</code> 改成 <code>print(trip["city"], trip["budget"])</code>，一次印兩個欄位。'
  ];

  const sqlChallenges = [
    '把 <code>&gt; 5</code> 改成 <code>&gt;= 5</code>。Result 會多出哪一列？',
    '改成 <code>WHERE budget &lt; 30000</code>，找出預算低於 30,000 的旅行。',
    '刪掉 <code>WHERE</code>，最後加上 <code>ORDER BY budget DESC</code>，看看誰最貴。'
  ];

  let pyodidePromise;
  let sqlPromise;
  let sqlDb;
  let pythonChallengeIndex = 0;
  let sqlChallengeIndex = 0;

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[src="${src}"]`);
      if (existing) {
        if (existing.dataset.loaded === 'true') resolve();
        else existing.addEventListener('load', resolve, { once: true });
        return;
      }

      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.addEventListener('load', () => {
        script.dataset.loaded = 'true';
        resolve();
      }, { once: true });
      script.addEventListener('error', () => reject(new Error(`無法載入 ${src}`)), { once: true });
      document.head.appendChild(script);
    });
  }

  async function getPyodide() {
    if (!pyodidePromise) {
      pyodidePromise = (async () => {
        await loadScript(`${PYODIDE_BASE}pyodide.js`);
        return window.loadPyodide({ indexURL: PYODIDE_BASE });
      })();
    }
    return pyodidePromise;
  }

  async function getSql() {
    if (!sqlPromise) {
      sqlPromise = (async () => {
        await loadScript(`${SQLJS_BASE}sql-wasm.js`);
        return window.initSqlJs({ locateFile: file => `${SQLJS_BASE}${file}` });
      })();
    }
    return sqlPromise;
  }

  async function resetSqlDb() {
    const SQL = await getSql();
    if (sqlDb) sqlDb.close();
    sqlDb = new SQL.Database();
    sqlDb.run(`
      CREATE TABLE trips (
        id INTEGER PRIMARY KEY,
        city TEXT NOT NULL,
        days INTEGER NOT NULL,
        budget INTEGER NOT NULL
      );
      INSERT INTO trips (id, city, days, budget) VALUES
        (1, 'Hokkaido', 7, 42000),
        (2, 'Tokyo', 5, 28000),
        (3, 'Chiang Mai', 4, 18000);
    `);
    return sqlDb;
  }

  function setBusy(button, status, message) {
    button.disabled = true;
    status.textContent = message;
  }

  function clearBusy(button, status, message) {
    button.disabled = false;
    status.textContent = message;
  }

  function renderSqlResult(container, result) {
    container.innerHTML = '';

    if (!result.length) {
      container.innerHTML = '<span class="empty-output">查詢成功，但沒有符合條件的資料。</span>';
      return;
    }

    const first = result[0];
    const table = document.createElement('table');
    table.className = 'result-table';

    const thead = document.createElement('thead');
    const headRow = document.createElement('tr');
    first.columns.forEach(column => {
      const th = document.createElement('th');
      th.textContent = column;
      headRow.appendChild(th);
    });
    thead.appendChild(headRow);

    const tbody = document.createElement('tbody');
    first.values.forEach(row => {
      const tr = document.createElement('tr');
      row.forEach(value => {
        const td = document.createElement('td');
        td.textContent = value == null ? 'NULL' : String(value);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });

    table.append(thead, tbody);
    container.appendChild(table);
  }

  async function runPython() {
    const editor = document.querySelector('#python-code');
    const output = document.querySelector('#python-output');
    const button = document.querySelector('#python-run');
    const status = document.querySelector('#python-status');
    if (!editor || !output || !button || !status) return;

    setBusy(button, status, '正在準備 Python…');
    output.textContent = '執行中…';

    try {
      const pyodide = await getPyodide();
      const lines = [];
      pyodide.setStdout({ batched: line => lines.push(line) });
      pyodide.setStderr({ batched: line => lines.push(line) });
      const result = await pyodide.runPythonAsync(editor.value);

      if (lines.length) output.textContent = lines.join('\n');
      else if (result !== undefined && result !== null) output.textContent = String(result);
      else output.textContent = '執行完成，沒有輸出。';

      clearBusy(button, status, 'Python 已就緒');
    } catch (error) {
      output.textContent = String(error);
      clearBusy(button, status, '有錯誤也沒關係，先看 Output');
    }
  }

  async function runSql() {
    const editor = document.querySelector('#sql-code');
    const output = document.querySelector('#sql-output');
    const button = document.querySelector('#sql-run');
    const status = document.querySelector('#sql-status');
    if (!editor || !output || !button || !status) return;

    setBusy(button, status, '正在準備 SQLite…');
    output.innerHTML = '<span class="empty-output">執行中…</span>';

    try {
      if (!sqlDb) await resetSqlDb();
      const result = sqlDb.exec(editor.value);
      renderSqlResult(output, result);
      clearBusy(button, status, 'SQLite 已就緒');
    } catch (error) {
      output.innerHTML = '';
      const pre = document.createElement('pre');
      pre.className = 'inline-error';
      pre.textContent = String(error);
      output.appendChild(pre);
      clearBusy(button, status, '有錯誤也沒關係，先讀錯誤訊息');
    }
  }

  function initPython() {
    document.querySelector('#python-run')?.addEventListener('click', runPython);
    document.querySelector('#python-reset')?.addEventListener('click', () => {
      document.querySelector('#python-code').value = pythonDefault;
      document.querySelector('#python-output').textContent = '已重設，按 Run 看結果。';
    });
    document.querySelector('#python-challenge')?.addEventListener('click', () => {
      const box = document.querySelector('#python-challenge-text');
      box.innerHTML = pythonChallenges[pythonChallengeIndex % pythonChallenges.length];
      pythonChallengeIndex += 1;
    });
  }

  function initSqlPlayground() {
    document.querySelector('#sql-run')?.addEventListener('click', runSql);
    document.querySelector('#sql-reset')?.addEventListener('click', async () => {
      document.querySelector('#sql-code').value = sqlDefault;
      document.querySelector('#sql-output').innerHTML = '<span class="empty-output">已重設，按 Run 看結果。</span>';
      if (sqlDb) await resetSqlDb();
    });
    document.querySelector('#sql-challenge')?.addEventListener('click', () => {
      const box = document.querySelector('#sql-challenge-text');
      box.innerHTML = sqlChallenges[sqlChallengeIndex % sqlChallenges.length];
      sqlChallengeIndex += 1;
    });
  }

  window.initInteractivePlaygrounds = function initInteractivePlaygrounds() {
    initPython();
    initSqlPlayground();
  };
})();