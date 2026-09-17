* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}


body {

    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background: #f4f6f8;

    color: #1f2937;
}


/* ================= NAVBAR ================= */

.navbar {

    background: #111827;

    color: white;

    min-height: 65px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    padding: 0 30px;

    position: sticky;

    top: 0;

    z-index: 100;
}


.logo {

    font-size: 20px;

    font-weight: bold;
}


.nav-links {

    display: flex;

    gap: 8px;
}


.nav-links button {

    background: transparent;

    border: none;

    color: #d1d5db;

    padding: 10px 14px;

    border-radius: 6px;

    cursor: pointer;

    font-size: 14px;
}


.nav-links button:hover {

    background: #374151;

    color: white;
}



/* ================= PAGES ================= */

.page {

    display: none;

    max-width: 1200px;

    margin: auto;

    padding: 35px 20px;
}


.page.active {

    display: block;
}


.page-header {

    margin-bottom: 25px;
}


.page-header h1 {

    font-size: 30px;

    margin-bottom: 8px;
}


.page-header p {

    color: #6b7280;

    line-height: 1.6;
}



/* ================= CARDS ================= */

.card {

    background: white;

    border-radius: 12px;

    padding: 25px;

    margin-bottom: 25px;

    border: 1px solid #e5e7eb;
}


.card h2 {

    margin-bottom: 20px;
}



/* ================= DASHBOARD ================= */

.stats-grid {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 20px;

    margin-bottom: 25px;
}


.stat-card {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    padding: 22px;
}


.stat-card span {

    display: block;

    color: #6b7280;

    font-size: 14px;

    margin-bottom: 8px;
}


.stat-card strong {

    font-size: 25px;
}



/* ================= FORM ================= */

.form-grid {

    display: grid;

    grid-template-columns:
        repeat(2, 1fr);

    gap: 20px;
}


.form-group {

    display: flex;

    flex-direction: column;

    gap: 7px;
}


.full-width {

    grid-column: 1 / -1;
}


label {

    font-size: 14px;

    font-weight: bold;
}


input,
textarea {

    width: 100%;

    padding: 12px;

    border: 1px solid #d1d5db;

    border-radius: 7px;

    font-size: 14px;
}


textarea {

    min-height: 100px;

    resize: vertical;
}


input:focus,
textarea:focus {

    outline: none;

    border-color: #4b5563;
}



/* ================= BUTTON ================= */

.primary-btn {

    margin-top: 20px;

    padding: 12px 20px;

    border: none;

    border-radius: 7px;

    background: #111827;

    color: white;

    cursor: pointer;

    font-weight: bold;
}


.primary-btn:hover {

    background: #374151;
}



/* ================= TRADES ================= */

.trade-item {

    border-bottom: 1px solid #e5e7eb;

    padding: 15px 0;

    display: flex;

    justify-content: space-between;

    align-items: center;
}


.trade-item:last-child {

    border-bottom: none;
}


.trade-info strong {

    display: block;

    margin-bottom: 5px;
}


.trade-info small {

    color: #6b7280;
}


.profit {

    color: #15803d;

    font-weight: bold;
}


.loss {

    color: #dc2626;

    font-weight: bold;
}


.break-even {

    color: #6b7280;

    font-weight: bold;
}


.empty {

    color: #9ca3af;

    padding: 15px 0;
}



/* ================= CALENDAR ================= */

.calendar-controls {

    display: flex;

    align-items: center;

    justify-content: space-between;

    margin-bottom: 20px;
}


.calendar-controls button {

    border: none;

    background: #111827;

    color: white;

    padding: 10px 15px;

    border-radius: 6px;

    cursor: pointer;
}


.calendar-summary {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 15px;

    margin-bottom: 20px;
}


.calendar-summary div {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 18px;
}


.calendar-summary span {

    display: block;

    font-size: 13px;

    color: #6b7280;

    margin-bottom: 5px;
}


.calendar-summary strong {

    font-size: 20px;
}


.calendar {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    overflow: hidden;

    margin-bottom: 25px;
}


.calendar-weekdays,
.calendar-days {

    display: grid;

    grid-template-columns:
        repeat(7, 1fr);
}


.calendar-weekdays div {

    padding: 15px;

    text-align: center;

    font-weight: bold;

    background: #f9fafb;

    border-bottom: 1px solid #e5e7eb;
}


.calendar-day {

    min-height: 100px;

    padding: 10px;

    border-right: 1px solid #e5e7eb;

    border-bottom: 1px solid #e5e7eb;

    cursor: pointer;
}


.calendar-day:hover {

    background: #f9fafb;
}


.calendar-day-number {

    font-weight: bold;
}


.day-pnl {

    margin-top: 10px;

    font-size: 13px;

    font-weight: bold;
}


.day-trades {

    margin-top: 4px;

    font-size: 11px;

    color: #6b7280;
}



/* ================= STRATEGY TABS ================= */

.strategy-tabs {

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 10px;

    margin-bottom: 25px;
}


.strategy-tab {

    border: 1px solid #d1d5db;

    background: white;

    padding: 15px;

    border-radius: 8px;

    cursor: pointer;

    font-weight: bold;
}


.strategy-tab:hover {

    background: #f3f4f6;
}


.strategy-tab.active {

    background: #111827;

    color: white;

    border-color: #111827;
}



/* ================= STRATEGY HEADER ================= */

.strategy-header {

    background: #111827;

    color: white;

    padding: 30px;

    border-radius: 12px;

    margin-bottom: 20px;
}


.strategy-header h2 {

    margin-bottom: 10px;

    font-size: 25px;
}


.strategy-header p {

    color: #d1d5db;

    line-height: 1.7;
}



/* ================= STRATEGY STATS ================= */

.strategy-stats {

    display: grid;

    grid-template-columns:
        repeat(6, 1fr);

    gap: 12px;

    margin-bottom: 20px;
}


.strategy-stat {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 18px;
}


.strategy-stat span {

    display: block;

    color: #6b7280;

    font-size: 12px;

    margin-bottom: 6px;
}


.strategy-stat strong {

    font-size: 20px;
}



/* ================= QUICK FLOW ================= */

.quick-flow {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    padding: 25px;

    margin-bottom: 20px;
}


.quick-flow h3 {

    margin-bottom: 15px;
}


.flow {

    font-weight: bold;

    line-height: 2;

    color: #374151;
}



/* ================= GUIDE ================= */

.guide-step {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 10px;

    padding: 25px;

    margin-bottom: 15px;
}


.guide-step h3 {

    display: flex;

    align-items: center;

    margin-bottom: 15px;
}


.step-number {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    width: 35px;

    height: 35px;

    border-radius: 50%;

    background: #111827;

    color: white;

    font-weight: bold;

    margin-right: 10px;

    flex-shrink: 0;
}


.guide-step p {

    line-height: 1.7;

    color: #4b5563;

    margin-bottom: 12px;
}


.guide-step ul {

    margin-left: 25px;

    color: #4b5563;

    line-height: 1.8;
}


.guide-step li {

    margin-bottom: 4px;
}


.tip-box {

    background: #f9fafb;

    border-left: 4px solid #111827;

    padding: 15px 18px;

    margin-top: 15px;

    line-height: 1.6;
}



/* ================= RESULT ================= */

.result-card {

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    padding: 25px;

    margin-top: 20px;

    margin-bottom: 25px;
}


.result-card p {

    color: #6b7280;

    line-height: 1.6;
}


.result-form {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 15px;

    margin-top: 20px;
}


.result-form label {

    display: block;

    margin-bottom: 7px;
}


.result-form input {

    width: 100%;
}


.ratio-help {

    font-size: 13px;

    color: #6b7280;

    margin-top: 5px;
}


.result-buttons {

    display: flex;

    gap: 10px;

    margin-top: 15px;
}


.result-buttons button {

    flex: 1;

    padding: 13px;

    border: none;

    border-radius: 7px;

    cursor: pointer;

    font-weight: bold;
}


.win-btn {

    background: #dcfce7;

    color: #166534;
}


.loss-btn {

    background: #fee2e2;

    color: #991b1b;
}


.result-buttons button:hover {

    filter: brightness(0.95);
}



/* ================= STRATEGY HISTORY ================= */

.strategy-history {

    margin-top: 10px;
}


.history-result {

    font-weight: bold;
}


.history-r {

    font-weight: bold;

    font-size: 15px;
}



/* ================= COMPARISON ================= */

.comparison-section {

    margin-top: 35px;

    background: white;

    border: 1px solid #e5e7eb;

    border-radius: 12px;

    padding: 25px;
}


.comparison-header {

    margin-bottom: 20px;
}


.comparison-header h2 {

    margin-bottom: 7px;
}


.comparison-header p {

    color: #6b7280;

    line-height: 1.6;
}


.comparison-table-container {

    overflow-x: auto;
}


.comparison-table {

    width: 100%;

    border-collapse: collapse;

    min-width: 800px;
}


.comparison-table th,
.comparison-table td {

    padding: 14px;

    border-bottom: 1px solid #e5e7eb;

    text-align: left;
}


.comparison-table th {

    background: #f9fafb;

    font-size: 13px;
}


.comparison-table td {

    font-size: 14px;
}


.positive-r {

    color: #15803d;

    font-weight: bold;
}


.negative-r {

    color: #dc2626;

    font-weight: bold;
}


.neutral-r {

    color: #6b7280;

    font-weight: bold;
}



/* ================= RESPONSIVE ================= */

@media (max-width: 900px) {

    .strategy-stats {

        grid-template-columns:
            repeat(3, 1fr);
    }

}


@media (max-width: 800px) {

    .navbar {

        flex-direction: column;

        gap: 10px;

        padding: 15px;
    }


    .nav-links {

        flex-wrap: wrap;

        justify-content: center;
    }


    .stats-grid,
    .calendar-summary {

        grid-template-columns:
            repeat(2, 1fr);
    }


    .form-grid {

        grid-template-columns: 1fr;
    }


    .full-width {

        grid-column: auto;
    }


    .strategy-tabs {

        grid-template-columns: 1fr;
    }


    .result-form {

        grid-template-columns: 1fr;
    }

}


@media (max-width: 500px) {

    .stats-grid,
    .calendar-summary,
    .strategy-stats {

        grid-template-columns: 1fr;
    }


    .calendar-weekdays div {

        font-size: 11px;

        padding: 10px 3px;
    }


    .calendar-day {

        min-height: 65px;

        padding: 6px;
    }

}
