/* =========================================
   DATA
========================================= */

let trades = JSON.parse(localStorage.getItem("cryptoTrades")) || [];

let strategies = JSON.parse(localStorage.getItem("cryptoStrategies")) || [];

let currentCalendarDate = new Date();

let selectedStrategyId = null;

/* =========================================
   SAVE DATA
========================================= */

function saveTrades() {
  localStorage.setItem("cryptoTrades", JSON.stringify(trades));
}

function saveStrategies() {
  localStorage.setItem("cryptoStrategies", JSON.stringify(strategies));
}

/* =========================================
   BASIC FUNCTIONS
========================================= */

function showSection(sectionId) {
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  document.getElementById(sectionId).classList.add("active");

  if (sectionId === "dashboard") {
    updateDashboard();
  }

  if (sectionId === "journal") {
    displayTrades();
  }

  if (sectionId === "calendar") {
    displayCalendar();
  }

  if (sectionId === "strategies") {
    displayStrategies();

    if (selectedStrategyId !== null) {
      displaySelectedStrategy();
    }
  }
}

function getTodayString() {
  const today = new Date();

  const year = today.getFullYear();

  const month = String(today.getMonth() + 1).padStart(2, "0");

  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatMoney(amount) {
  amount = Number(amount) || 0;

  if (amount > 0) {
    return `+$${amount.toFixed(2)}`;
  }

  if (amount < 0) {
    return `-$${Math.abs(amount).toFixed(2)}`;
  }

  return "$0.00";
}

function getResult(pnl) {
  if (pnl > 0) {
    return "Win";
  }

  if (pnl < 0) {
    return "Loss";
  }

  return "Break Even";
}

function getResultClass(pnl) {
  if (pnl > 0) {
    return "profit";
  }

  if (pnl < 0) {
    return "loss";
  }

  return "break-even";
}

/* =========================================
   DASHBOARD
========================================= */

function updateDashboard() {
  const totalPnL = trades.reduce((sum, trade) => sum + Number(trade.pnl), 0);

  const wins = trades.filter((trade) => Number(trade.pnl) > 0).length;

  const losses = trades.filter((trade) => Number(trade.pnl) < 0).length;

  const total = trades.length;

  const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

  const pnlElement = document.getElementById("totalPnL");

  pnlElement.textContent = formatMoney(totalPnL);

  pnlElement.className = totalPnL > 0 ? "profit" : totalPnL < 0 ? "loss" : "";

  document.getElementById("totalTrades").textContent = total;

  document.getElementById("winRate").textContent = `${winRate}%`;

  document.getElementById("winsLosses").textContent = `${wins} / ${losses}`;

  displayRecentTrades();
}

function displayRecentTrades() {
  const container = document.getElementById("recentTrades");

  if (trades.length === 0) {
    container.innerHTML = `<div class="empty-state">No trades yet.</div>`;

    return;
  }

  const recent = [...trades]
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time || "00:00:00"}`);

      const dateB = new Date(`${b.date}T${b.time || "00:00:00"}`);

      return dateB - dateA;
    })
    .slice(0, 5);

  let html = `
        <div class="table-container">
        <table>

        <thead>
            <tr>
                <th>Date</th>
                <th>Crypto</th>
                <th>P/L</th>
                <th>Result</th>
            </tr>
        </thead>

        <tbody>
    `;

  recent.forEach((trade) => {
    html += `
            <tr>

                <td>${trade.date}</td>

                <td>${escapeHTML(trade.crypto)}</td>

                <td class="${getResultClass(trade.pnl)}">
                    ${formatMoney(trade.pnl)}
                </td>

                <td>
                    ${getResult(trade.pnl)}
                </td>

            </tr>
        `;
  });

  html += `
        </tbody>
        </table>
        </div>
    `;

  container.innerHTML = html;
}

/* =========================================
   TRADE JOURNAL
========================================= */

function toggleTradeForm() {
  document.getElementById("tradeForm").classList.toggle("hidden");

  document.getElementById("tradeDate").value = getTodayString();
}

function addTrade(event) {
  event.preventDefault();

  const date = document.getElementById("tradeDate").value;

  const crypto = document.getElementById("tradeCrypto").value.trim();

  const pnl = Number(document.getElementById("tradePnL").value);

  const notes = document.getElementById("tradeNotes").value.trim();

  const now = new Date();

  const trade = {
    id: Date.now(),

    date: date,

    time:
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0"),

    crypto: crypto,

    pnl: pnl,

    notes: notes,

    strategyId: null,
  };

  trades.push(trade);

  saveTrades();

  document.getElementById("tradeForm").classList.add("hidden");

  event.target.reset();

  document.getElementById("tradeDate").value = getTodayString();

  updateDashboard();

  displayTrades();

  displayCalendar();
}

function displayTrades() {
  const table = document.getElementById("tradeTable");

  const noTrades = document.getElementById("noTrades");

  document.getElementById("journalTradeCount").textContent =
    `${trades.length} trade${trades.length === 1 ? "" : "s"}`;

  if (trades.length === 0) {
    table.innerHTML = "";

    noTrades.style.display = "block";

    return;
  }

  noTrades.style.display = "none";

  const sortedTrades = [...trades].sort((a, b) => b.id - a.id);

  table.innerHTML = sortedTrades
    .map((trade) => {
      return `
            <tr>

                <td>${trade.date}</td>

                <td>${escapeHTML(trade.crypto)}</td>

                <td class="${getResultClass(trade.pnl)}">
                    ${formatMoney(trade.pnl)}
                </td>

                <td class="${getResultClass(trade.pnl)}">
                    ${getResult(trade.pnl)}
                </td>

                <td>
                    ${trade.notes ? escapeHTML(trade.notes) : "-"}
                </td>

                <td>
                    <button
                        class="delete-trade"
                        onclick="deleteTrade(${trade.id})"
                    >
                        Delete
                    </button>
                </td>

            </tr>
        `;
    })
    .join("");
}

function deleteTrade(id) {
  if (!confirm("Delete this trade?")) {
    return;
  }

  trades = trades.filter((trade) => trade.id !== id);

  saveTrades();

  updateDashboard();

  displayTrades();

  displayCalendar();
}

/* =========================================
   CALENDAR
========================================= */

function changeMonth(direction) {
  currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);

  displayCalendar();
}

function displayCalendar() {
  const year = currentCalendarDate.getFullYear();

  const month = currentCalendarDate.getMonth();

  const monthName = currentCalendarDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  document.getElementById("calendarMonth").textContent = monthName;

  const firstDay = new Date(year, month, 1);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  /*
       Convert Sunday = 0
       to Monday = 0
    */

  let startingDay = firstDay.getDay() - 1;

  if (startingDay < 0) {
    startingDay = 6;
  }

  const calendar = document.getElementById("calendarDays");

  calendar.innerHTML = "";

  // Empty spaces before first day

  for (let i = 0; i < startingDay; i++) {
    const empty = document.createElement("div");

    empty.className = "calendar-day empty";

    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const dayTrades = trades.filter((trade) => trade.date === dateString);

    const dailyPnL = dayTrades.reduce(
      (sum, trade) => sum + Number(trade.pnl),
      0,
    );

    const dayElement = document.createElement("div");

    dayElement.className = "calendar-day";

    if (dateString === getTodayString()) {
      dayElement.classList.add("today");
    }

    let pnlHTML = "";

    if (dayTrades.length > 0) {
      pnlHTML = `
                <div class="day-pnl ${getResultClass(dailyPnL)}">
                    ${formatMoney(dailyPnL)}
                </div>

                <div class="day-trades">
                    ${dayTrades.length}
                    trade${dayTrades.length === 1 ? "" : "s"}
                </div>
            `;
    }

    dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            ${pnlHTML}
        `;

    dayElement.onclick = () => showSelectedDay(dateString);

    calendar.appendChild(dayElement);
  }

  updateMonthlyStats(year, month);
}

function updateMonthlyStats(year, month) {
  const monthTrades = trades.filter((trade) => {
    const date = new Date(trade.date + "T00:00:00");

    return date.getFullYear() === year && date.getMonth() === month;
  });

  const pnl = monthTrades.reduce((sum, trade) => sum + Number(trade.pnl), 0);

  const wins = monthTrades.filter((trade) => Number(trade.pnl) > 0).length;

  const losses = monthTrades.filter((trade) => Number(trade.pnl) < 0).length;

  const pnlElement = document.getElementById("monthlyPnL");

  pnlElement.textContent = formatMoney(pnl);

  pnlElement.className = pnl > 0 ? "profit" : pnl < 0 ? "loss" : "";

  document.getElementById("monthlyTrades").textContent = monthTrades.length;

  document.getElementById("monthlyWins").textContent = wins;

  document.getElementById("monthlyLosses").textContent = losses;
}

function showSelectedDay(dateString) {
  const container = document.getElementById("selectedDay");

  const dayTrades = trades.filter((trade) => trade.date === dateString);

  if (dayTrades.length === 0) {
    container.innerHTML = `
            <h2>${dateString}</h2>
            <p>No trades on this day.</p>
        `;

    return;
  }

  const dailyPnL = dayTrades.reduce((sum, trade) => sum + Number(trade.pnl), 0);

  let html = `
        <h2>${dateString}</h2>

        <p class="${getResultClass(dailyPnL)}">
            Daily P/L: ${formatMoney(dailyPnL)}
        </p>

        <br>

        <div class="table-container">

        <table>

        <thead>
            <tr>
                <th>Crypto</th>
                <th>P/L</th>
                <th>Result</th>
                <th>Notes</th>
            </tr>
        </thead>

        <tbody>
    `;

  dayTrades.forEach((trade) => {
    html += `
            <tr>

                <td>
                    ${escapeHTML(trade.crypto)}
                </td>

                <td class="${getResultClass(trade.pnl)}">
                    ${formatMoney(trade.pnl)}
                </td>

                <td>
                    ${getResult(trade.pnl)}
                </td>

                <td>
                    ${trade.notes ? escapeHTML(trade.notes) : "-"}
                </td>

            </tr>
        `;
  });

  html += `
        </tbody>
        </table>

        </div>
    `;

  container.innerHTML = html;
}

/* =========================================
   STRATEGIES
========================================= */

function createStrategy(event) {
  event.preventDefault();

  const name = document.getElementById("strategyName").value.trim();

  if (!name) {
    return;
  }

  const strategy = {
    id: Date.now(),

    name: name,

    createdAt: new Date().toISOString(),
  };

  strategies.push(strategy);

  saveStrategies();

  selectedStrategyId = strategy.id;

  document.getElementById("strategyName").value = "";

  displayStrategies();

  displaySelectedStrategy();
}

function displayStrategies() {
  const container = document.getElementById("strategyList");

  const noStrategies = document.getElementById("noStrategies");

  document.getElementById("strategyCount").textContent =
    `${strategies.length} strateg${strategies.length === 1 ? "y" : "ies"}`;

  if (strategies.length === 0) {
    container.innerHTML = "";

    noStrategies.style.display = "block";

    document.getElementById("strategyDetails").classList.add("hidden");

    return;
  }

  noStrategies.style.display = "none";

  container.innerHTML = strategies
    .map((strategy) => {
      const strategyTrades = trades.filter(
        (trade) => trade.strategyId === strategy.id,
      );

      const wins = strategyTrades.filter(
        (trade) => Number(trade.pnl) > 0,
      ).length;

      const losses = strategyTrades.filter(
        (trade) => Number(trade.pnl) < 0,
      ).length;

      const total = strategyTrades.length;

      const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

      return `
                <div
                    class="strategy-card
                    ${selectedStrategyId === strategy.id ? "selected" : ""}"
                    onclick="selectStrategy(${strategy.id})"
                >

                    <h3>
                        ${escapeHTML(strategy.name)}
                    </h3>

                    <div class="strategy-card-stats">

                        <div>
                            <span>Trades</span>
                            <strong>${total}</strong>
                        </div>

                        <div>
                            <span>W / L</span>
                            <strong>${wins} / ${losses}</strong>
                        </div>

                        <div>
                            <span>Win Rate</span>
                            <strong>${winRate}%</strong>
                        </div>

                    </div>

                </div>
            `;
    })
    .join("");
}

function selectStrategy(id) {
  selectedStrategyId = id;

  displayStrategies();

  displaySelectedStrategy();
}

function displaySelectedStrategy() {
  const strategy = strategies.find(
    (strategy) => strategy.id === selectedStrategyId,
  );

  if (!strategy) {
    document.getElementById("strategyDetails").classList.add("hidden");

    return;
  }

  document.getElementById("strategyDetails").classList.remove("hidden");

  document.getElementById("selectedStrategyName").textContent = strategy.name;

  const strategyTrades = trades.filter(
    (trade) => trade.strategyId === strategy.id,
  );

  const wins = strategyTrades.filter((trade) => Number(trade.pnl) > 0).length;

  const losses = strategyTrades.filter((trade) => Number(trade.pnl) < 0).length;

  const total = strategyTrades.length;

  const winRate = total > 0 ? ((wins / total) * 100).toFixed(1) : 0;

  document.getElementById("strategyTotal").textContent = total;

  document.getElementById("strategyWins").textContent = wins;

  document.getElementById("strategyLosses").textContent = losses;

  document.getElementById("strategyWinRate").textContent = `${winRate}%`;

  displayStrategyTrades(strategyTrades);
}

/* =========================================
   AUTOMATIC STRATEGY TRADE RECORDER
========================================= */

function recordStrategyTrade(result) {
  const strategy = strategies.find(
    (strategy) => strategy.id === selectedStrategyId,
  );

  if (!strategy) {
    return;
  }

  let pnl = 0;

  /*
       We don't ask the user for P/L here.

       WIN = 1
       LOSS = -1
       BREAK EVEN = 0

       This allows the strategy tester to
       calculate the statistics automatically.
    */

  if (result === "win") {
    pnl = 1;
  }

  if (result === "loss") {
    pnl = -1;
  }

  if (result === "be") {
    pnl = 0;
  }

  const now = new Date();

  const trade = {
    id: Date.now(),

    date: getTodayString(),

    time:
      now.getHours().toString().padStart(2, "0") +
      ":" +
      now.getMinutes().toString().padStart(2, "0"),

    crypto: "Strategy Test",

    pnl: pnl,

    notes: "",

    strategyId: strategy.id,

    strategyResult: result,
  };

  trades.push(trade);

  saveTrades();

  displayStrategies();

  displaySelectedStrategy();

  updateDashboard();

  displayCalendar();
}

function displayStrategyTrades(strategyTrades) {
  const table = document.getElementById("strategyTradeTable");

  const empty = document.getElementById("noStrategyTrades");

  if (strategyTrades.length === 0) {
    table.innerHTML = "";

    empty.style.display = "block";

    return;
  }

  empty.style.display = "none";

  const sorted = [...strategyTrades].sort((a, b) => b.id - a.id);

  table.innerHTML = sorted
    .map((trade, index) => {
      let resultText = "";

      let resultClass = "";

      if (trade.strategyResult === "win") {
        resultText = "✓ WIN";

        resultClass = "result-win";
      } else if (trade.strategyResult === "loss") {
        resultText = "✕ LOSS";

        resultClass = "result-loss";
      } else {
        resultText = "= BREAK EVEN";

        resultClass = "result-be";
      }

      return `
                <tr>

                    <td>
                        #${sorted.length - index}
                    </td>

                    <td>
                        ${trade.date}
                    </td>

                    <td>
                        ${trade.time}
                    </td>

                    <td class="${resultClass}">
                        ${resultText}
                    </td>

                    <td>

                        <button
                            class="delete-trade"
                            onclick="deleteStrategyTrade(${trade.id})"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;
    })
    .join("");
}

/* =========================================
   DELETE STRATEGY TRADE
========================================= */

function deleteStrategyTrade(id) {
  if (!confirm("Delete this test trade?")) {
    return;
  }

  trades = trades.filter((trade) => trade.id !== id);

  saveTrades();

  displayStrategies();

  displaySelectedStrategy();

  updateDashboard();

  displayCalendar();
}

/* =========================================
   DELETE STRATEGY
========================================= */

function deleteSelectedStrategy() {
  const strategy = strategies.find(
    (strategy) => strategy.id === selectedStrategyId,
  );

  if (!strategy) {
    return;
  }

  const confirmDelete = confirm(
    `Delete "${strategy.name}"?\n\nThe strategy will be removed, but its recorded trades will remain in your journal.`,
  );

  if (!confirmDelete) {
    return;
  }

  /*
       Keep the trades but remove the
       strategy association.
    */

  trades = trades.map((trade) => {
    if (trade.strategyId === strategy.id) {
      return {
        ...trade,
        strategyId: null,
      };
    }

    return trade;
  });

  strategies = strategies.filter(
    (strategy) => strategy.id !== selectedStrategyId,
  );

  selectedStrategyId = null;

  saveTrades();

  saveStrategies();

  displayStrategies();

  updateDashboard();

  displayTrades();

  displayCalendar();
}

/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* =========================================
   START WEBSITE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("tradeDate").value = getTodayString();

  updateDashboard();

  displayTrades();

  displayCalendar();

  displayStrategies();
});
