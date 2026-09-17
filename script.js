/* =========================================================
   CRYPTO TRADING JOURNAL
   ========================================================= */


/* ================= DATA ================= */

let trades =
    JSON.parse(
        localStorage.getItem("cryptoTrades")
    ) || [];


let currentCalendarDate =
    new Date();


let selectedStrategy =
    "liquidity";



/* =========================================================
   STRATEGIES
   ========================================================= */

const strategies = {


    /* =====================================================
       STRATEGY 1
       ===================================================== */

    liquidity: {

        name:
            "Liquidity Sweep → Reclaim → Continuation",

        description:
            "This strategy looks for price to sweep an important liquidity level, reclaim that level, and then continue in the opposite direction of the sweep.",


        steps: [

            {
                title:
                    "Mark Important Liquidity Areas",

                timeframe:
                    "1H",

                text:
                    "Start on the 1H chart. Identify important areas where price may react or where liquidity may be located.",

                bullets: [

                    "Previous swing highs",

                    "Previous swing lows",

                    "Equal highs",

                    "Equal lows",

                    "Previous day high",

                    "Previous day low",

                    "Major support and resistance"

                ],

                tip:
                    "You are not looking for an entry yet. You are simply identifying important locations on the chart."
            },


            {
                title:
                    "Wait for Price to Approach the Level",

                timeframe:
                    "15M",

                text:
                    "Move to the 15M chart and wait for price to approach one of the important levels you marked.",

                bullets: [

                    "Do not chase price while it is far from the level.",

                    "Do not enter simply because price touches the level.",

                    "Observe the reaction around the area."

                ],

                tip:
                    "The level provides the location. The reaction at that level creates the potential setup."
            },


            {
                title:
                    "Wait for the Liquidity Sweep",

                timeframe:
                    "15M",

                text:
                    "Price should move beyond an important high or low, taking the liquidity around that area.",

                bullets: [

                    "Bullish setup: price sweeps below an important low.",

                    "Bearish setup: price sweeps above an important high.",

                    "The sweep itself is not the entry."

                ],

                tip:
                    "Do not automatically treat every wick as a valid liquidity sweep. Consider the importance of the level and the reaction afterward."
            },


            {
                title:
                    "Wait for the Reclaim",

                timeframe:
                    "15M",

                text:
                    "After the sweep, wait for price to move back through and reclaim the important level.",

                bullets: [

                    "Bullish: sweep below the level, then reclaim it.",

                    "Bearish: sweep above the level, then reclaim it.",

                    "Do not enter immediately after the sweep."

                ],

                tip:
                    "The reclaim is important because you want evidence that price did not successfully hold beyond the swept level."
            },


            {
                title:
                    "Wait for Structure Confirmation",

                timeframe:
                    "5M",

                text:
                    "After the reclaim, move to the 5M chart and look for a structure shift or BOS in the potential trade direction.",

                bullets: [

                    "Bullish setup → bullish structure.",

                    "Bearish setup → bearish structure.",

                    "Do not force a structure break that is not clearly present."

                ],

                tip:
                    "The 15M gives you the setup location while the 5M helps provide entry confirmation."
            },


            {
                title:
                    "Wait for the Pullback",

                timeframe:
                    "5M",

                text:
                    "After the structure break, wait for price to pull back rather than immediately chasing the move.",

                bullets: [

                    "Broken structure",

                    "Reclaimed level",

                    "Demand or supply",

                    "Fair Value Gap (FVG)"

                ],

                tip:
                    "The pullback gives you a more controlled location for your entry."
            },


            {
                title:
                    "Set the Stop Loss",

                timeframe:
                    "5M",

                text:
                    "Place the stop loss beyond the area that would invalidate the setup.",

                bullets: [

                    "Bullish → potentially beyond the sweep low.",

                    "Bearish → potentially beyond the sweep high.",

                    "The SL should have a logical invalidation reason."

                ],

                tip:
                    "If price moves back through the invalidation area, the original setup is no longer behaving as expected."
            },


            {
                title:
                    "Set the Take Profit",

                timeframe:
                    "15M / 1H",

                text:
                    "Choose a logical target based on the chart.",

                bullets: [

                    "Opposing liquidity",

                    "Previous swing",

                    "Resistance",

                    "Support",

                    "Another important price level"

                ],

                tip:
                    "Your target should be based on available price structure rather than chosen randomly."
            }

        ],


        flow:
            "1H Liquidity → 15M Approach → Sweep → Reclaim → 5M Structure → Pullback → Entry → SL → TP"

    },



    /* =====================================================
       STRATEGY 2
       ===================================================== */

    range: {

        name:
            "Range → Breakout → Retest",

        description:
            "This strategy waits for price to establish a clear range, break out of that range, show acceptance outside it, and then retest the breakout level.",


        steps: [

            {
                title:
                    "Find a Genuine Range",

                timeframe:
                    "15M",

                text:
                    "Look for an area where price repeatedly reacts between an upper and lower boundary.",

                bullets: [

                    "Repeated reactions near the upper boundary.",

                    "Repeated reactions near the lower boundary.",

                    "Clear upper and lower boundaries.",

                    "Avoid treating every small sideways movement as a range."

                ],

                tip:
                    "A clearer range makes it easier to identify the breakout and subsequent retest."
            },


            {
                title:
                    "Mark Range High and Range Low",

                timeframe:
                    "15M",

                text:
                    "Clearly mark the upper and lower boundaries of the range.",

                bullets: [

                    "Range High = upper boundary.",

                    "Range Low = lower boundary.",

                    "These become the important breakout areas.",

                    "The middle of the range is generally not the area this strategy is targeting."

                ],

                tip:
                    "Think of the range as the battlefield. You are waiting for price to leave it."
            },


            {
                title:
                    "Stay Out of the Middle",

                timeframe:
                    "15M",

                text:
                    "Do not enter simply because price is moving inside the range.",

                bullets: [

                    "Wait for price to approach a boundary.",

                    "Avoid random entries in the middle.",

                    "Wait for the range to actually break."

                ],

                tip:
                    "This strategy focuses on the transition from range to breakout rather than random movements inside the range."
            },


            {
                title:
                    "Wait for the Actual Breakout",

                timeframe:
                    "15M",

                text:
                    "Price must break beyond either the Range High or Range Low.",

                bullets: [

                    "Bullish breakout → above Range High.",

                    "Bearish breakout → below Range Low.",

                    "Do not assume a brief move beyond the level is automatically valid."

                ],

                tip:
                    "The breakout creates the potential setup, but you still need to see whether price can hold outside the range."
            },


            {
                title:
                    "Wait for Acceptance Outside the Range",

                timeframe:
                    "15M",

                text:
                    "After the breakout, observe whether price can remain outside the range.",

                bullets: [

                    "Candle closes outside the range.",

                    "Price shows displacement.",

                    "Volume may support the breakout.",

                    "Price does not immediately fall back into the range."

                ],

                tip:
                    "This helps distinguish a potential genuine breakout from a breakout that immediately fails."
            },


            {
                title:
                    "Wait for the Retest",

                timeframe:
                    "15M",

                text:
                    "After acceptance, wait for price to return toward the breakout level.",

                bullets: [

                    "Bullish → retest the Range High.",

                    "Bearish → retest the Range Low.",

                    "Avoid chasing the initial breakout."

                ],

                tip:
                    "The old range boundary becomes the important retest area."
            },


            {
                title:
                    "Look for Confirmation",

                timeframe:
                    "5M",

                text:
                    "During the retest, move to the 5M chart and look for rejection and structure confirmation.",

                bullets: [

                    "Bullish breakout → bullish rejection/structure.",

                    "Bearish breakout → bearish rejection/structure.",

                    "Look for confirmation around the breakout level."

                ],

                tip:
                    "The retest provides the location while the 5M chart helps confirm the entry."
            },


            {
                title:
                    "Set the Stop Loss",

                timeframe:
                    "5M",

                text:
                    "Place the SL beyond the structure that invalidates the retest.",

                bullets: [

                    "Bullish → potentially below the retest structure.",

                    "Bearish → potentially above the retest structure.",

                    "The SL should have a logical invalidation point."

                ],

                tip:
                    "If price completely loses the breakout level, the original setup may be invalidated."
            },


            {
                title:
                    "Set the Take Profit",

                timeframe:
                    "15M / 1H",

                text:
                    "Choose a logical target in the direction of the breakout.",

                bullets: [

                    "Resistance",

                    "Support",

                    "Previous high or low",

                    "Liquidity",

                    "Another major price level"

                ],

                tip:
                    "Plan the target before entering so the trade has a defined objective."
            }

        ],


        flow:
            "Range → Breakout → Acceptance → Retest → 5M Confirmation → Entry → SL → TP"

    },



    /* =====================================================
       STRATEGY 3
       ===================================================== */

    failed: {

        name:
            "Failed Breakout → Reversal",

        description:
            "This strategy looks for a breakout that fails, followed by price returning inside the previous range or level and then reversing in the opposite direction.",


        steps: [

            {
                title:
                    "Mark an Important Level",

                timeframe:
                    "15M",

                text:
                    "Identify an important level where a breakout could occur.",

                bullets: [

                    "Range High",

                    "Range Low",

                    "Previous high",

                    "Previous low",

                    "Equal highs",

                    "Equal lows",

                    "Major support or resistance"

                ],

                tip:
                    "You need a meaningful level first. Otherwise there is no clear breakout failure to trade."
            },


            {
                title:
                    "Wait for the Breakout",

                timeframe:
                    "15M",

                text:
                    "Allow price to actually break through the important level.",

                bullets: [

                    "Bullish breakout → above the level.",

                    "Bearish breakout → below the level.",

                    "Do not enter immediately."

                ],

                tip:
                    "The breakout creates the possibility of a failed breakout. You are waiting to see what happens next."
            },


            {
                title:
                    "Do Not Enter Immediately",

                timeframe:
                    "15M",

                text:
                    "A breakout alone is not a reversal signal.",

                bullets: [

                    "Do not short simply because price broke upward.",

                    "Do not long simply because price broke downward.",

                    "Wait for evidence that the breakout is failing."

                ],

                tip:
                    "The goal is to trade a confirmed failed breakout rather than predict that a breakout will fail."
            },


            {
                title:
                    "Wait for the Breakout to Fail",

                timeframe:
                    "15M",

                text:
                    "Price needs to move back through the breakout level and close back inside the previous range or area.",

                bullets: [

                    "Upside breakout failure → price breaks above, then closes back below the breakout area.",

                    "Downside breakout failure → price breaks below, then closes back above the breakout area.",

                    "The return inside the range is important evidence of failure."

                ],

                tip:
                    "This is the point where a potential breakout becomes a potential reversal setup."
            },


            {
                title:
                    "Wait for Reversal Structure",

                timeframe:
                    "5M",

                text:
                    "Move to the 5M chart and look for structure confirmation in the reversal direction.",

                bullets: [

                    "Failed upside breakout → bearish structure.",

                    "Failed downside breakout → bullish structure.",

                    "Do not force the reversal before structure confirms it."

                ],

                tip:
                    "The 15M identifies the failed breakout. The 5M helps identify the reversal entry."
            },


            {
                title:
                    "Wait for the Retest",

                timeframe:
                    "5M",

                text:
                    "After reversal structure appears, wait for price to retest an appropriate area.",

                bullets: [

                    "Failed breakout area",

                    "Support/resistance",

                    "Supply/demand",

                    "Fair Value Gap",

                    "Broken structure"

                ],

                tip:
                    "The retest gives you a more controlled entry instead of chasing the reversal."
            },


            {
                title:
                    "Set the Stop Loss",

                timeframe:
                    "5M",

                text:
                    "Place the SL beyond the failed breakout area.",

                bullets: [

                    "Bearish reversal → potentially beyond the failed breakout high.",

                    "Bullish reversal → potentially beyond the failed breakout low.",

                    "The level should represent where the reversal idea becomes invalid."

                ],

                tip:
                    "If price moves back through the failed breakout extreme, the reversal setup may be invalidated."
            },


            {
                title:
                    "Set the Take Profit",

                timeframe:
                    "15M / 1H",

                text:
                    "Use logical areas inside or on the opposite side of the previous range as targets.",

                bullets: [

                    "Range midpoint",

                    "Range Low",

                    "Range High",

                    "Opposing liquidity",

                    "Previous swing"

                ],

                tip:
                    "The available target depends on the structure and how much room price has to move."
            }

        ],


        flow:
            "Key Level → Breakout → Failure → Close Back Inside → 5M Reversal Structure → Retest → Entry → SL → TP"

    }

};



/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active");

        });


    const page =
        document.getElementById(pageId);


    if (page) {

        page.classList.add("active");

    }


    if (pageId === "dashboard") {

        updateDashboard();

    }


    if (pageId === "journal") {

        renderTradeHistory();

    }


    if (pageId === "calendar") {

        renderCalendar();

    }


    if (pageId === "strategies") {

        renderStrategy();

        renderStrategyComparison();

    }

}



/* =========================================================
   ACTUAL TRADE JOURNAL
   ========================================================= */

document
    .getElementById("tradeForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const date =
                document
                    .getElementById("tradeDate")
                    .value;


            const crypto =
                document
                    .getElementById("crypto")
                    .value
                    .trim();


            const pnl =
                parseFloat(
                    document
                        .getElementById("pnl")
                        .value
                );


            const notes =
                document
                    .getElementById("notes")
                    .value
                    .trim();


            const trade = {

                id: Date.now(),

                type: "actual",

                date: date,

                crypto: crypto,

                pnl: pnl,

                notes: notes,

                strategyId: null

            };


            trades.push(trade);


            saveTrades();


            this.reset();


            setTodayDate();


            updateDashboard();

            renderTradeHistory();

            renderCalendar();


            alert("Trade saved!");

        }
    );



/* =========================================================
   SAVE
   ========================================================= */

function saveTrades() {

    localStorage.setItem(
        "cryptoTrades",
        JSON.stringify(trades)
    );

}



/* =========================================================
   DASHBOARD
   ========================================================= */

function updateDashboard() {

    const actualTrades =
        getActualTrades();


    const totalPnL =
        actualTrades.reduce(
            (total, trade) =>
                total +
                Number(trade.pnl || 0),
            0
        );


    const wins =
        actualTrades.filter(
            trade =>
                Number(trade.pnl) > 0
        ).length;


    const losses =
        actualTrades.filter(
            trade =>
                Number(trade.pnl) < 0
        ).length;


    const total =
        actualTrades.length;


    const winRate =
        total > 0
            ? ((wins / total) * 100).toFixed(1)
            : 0;


    document
        .getElementById("totalPnL")
        .textContent =
            formatMoney(totalPnL);


    document
        .getElementById("totalTrades")
        .textContent =
            total;


    document
        .getElementById("winRate")
        .textContent =
            `${winRate}%`;


    document
        .getElementById("winsLosses")
        .textContent =
            `${wins} / ${losses}`;


    updatePnLClass(
        document.getElementById("totalPnL"),
        totalPnL
    );


    renderRecentTrades();

}



/* =========================================================
   RECENT TRADES
   ========================================================= */

function renderRecentTrades() {

    const container =
        document.getElementById(
            "recentTrades"
        );


    const actualTrades =
        getActualTrades()
            .sort(
                (a, b) =>
                    b.id - a.id
            )
            .slice(0, 5);


    if (
        actualTrades.length === 0
    ) {

        container.innerHTML = `
            <p class="empty">
                No trades recorded yet.
            </p>
        `;

        return;
    }


    container.innerHTML =
        actualTrades
            .map(trade => {

                const className =
                    getPnLClass(
                        trade.pnl
                    );


                return `

                    <div class="trade-item">

                        <div class="trade-info">

                            <strong>
                                ${escapeHTML(
                                    trade.crypto
                                )}
                            </strong>

                            <small>
                                ${trade.date}
                            </small>

                        </div>

                        <div class="${className}">
                            ${formatMoney(
                                trade.pnl
                            )}
                        </div>

                    </div>

                `;

            })
            .join("");

}



/* =========================================================
   TRADE HISTORY
   ========================================================= */

function renderTradeHistory() {

    const container =
        document.getElementById(
            "tradeHistory"
        );


    const actualTrades =
        getActualTrades()
            .sort(
                (a, b) =>
                    b.id - a.id
            );


    if (
        actualTrades.length === 0
    ) {

        container.innerHTML = `
            <p class="empty">
                No trades recorded yet.
            </p>
        `;

        return;
    }


    container.innerHTML =
        actualTrades
            .map(trade => {

                const className =
                    getPnLClass(
                        trade.pnl
                    );


                return `

                    <div class="trade-item">

                        <div class="trade-info">

                            <strong>
                                ${escapeHTML(
                                    trade.crypto
                                )}
                            </strong>

                            <small>
                                ${trade.date}
                            </small>

                            ${
                                trade.notes
                                    ? `
                                        <p>
                                            ${escapeHTML(
                                                trade.notes
                                            )}
                                        </p>
                                      `
                                    : ""
                            }

                        </div>


                        <div>

                            <div class="${className}">
                                ${formatMoney(
                                    trade.pnl
                                )}
                            </div>


                            <button
                                onclick="deleteTrade(
                                    ${trade.id}
                                )"
                                style="
                                    margin-top:8px;
                                    border:none;
                                    background:none;
                                    color:#dc2626;
                                    cursor:pointer;
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                `;

            })
            .join("");

}



/* =========================================================
   DELETE
   ========================================================= */

function deleteTrade(id) {

    if (
        !confirm(
            "Delete this record?"
        )
    ) {

        return;

    }


    trades =
        trades.filter(
            trade =>
                trade.id !== id
        );


    saveTrades();


    updateDashboard();

    renderTradeHistory();

    renderCalendar();

    renderStrategy();

    renderStrategyComparison();

}



/* =========================================================
   CALENDAR
   ========================================================= */

function changeMonth(direction) {

    currentCalendarDate.setMonth(
        currentCalendarDate.getMonth() +
        direction
    );


    renderCalendar();

}



function renderCalendar() {

    const year =
        currentCalendarDate
            .getFullYear();


    const month =
        currentCalendarDate
            .getMonth();


    const monthName =
        currentCalendarDate
            .toLocaleString(
                "default",
                {
                    month: "long"
                }
            );


    document
        .getElementById(
            "calendarMonth"
        )
        .textContent =
            `${monthName} ${year}`;


    const calendarDays =
        document.getElementById(
            "calendarDays"
        );


    calendarDays.innerHTML = "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    for (
        let i = 0;
        i < firstDay;
        i++
    ) {

        const empty =
            document.createElement(
                "div"
            );


        empty.className =
            "calendar-day";


        calendarDays.appendChild(
            empty
        );

    }


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const dateString =
            `${year}-${String(
                month + 1
            ).padStart(2, "0")}-${String(
                day
            ).padStart(2, "0")}`;


        const dayTrades =
            getActualTrades()
                .filter(
                    trade =>
                        trade.date ===
                        dateString
                );


        const dayPnL =
            dayTrades.reduce(
                (sum, trade) =>
                    sum +
                    Number(
                        trade.pnl || 0
                    ),
                0
            );


        const cell =
            document.createElement(
                "div"
            );


        cell.className =
            "calendar-day";


        cell.onclick =
            () =>
                showDayTrades(
                    dateString
                );


        let pnlHTML = "";


        if (
            dayTrades.length > 0
        ) {

            const className =
                getPnLClass(
                    dayPnL
                );


            pnlHTML = `

                <div class="day-pnl ${className}">
                    ${formatMoney(
                        dayPnL
                    )}
                </div>

                <div class="day-trades">
                    ${dayTrades.length}
                    trade${
                        dayTrades.length !== 1
                            ? "s"
                            : ""
                    }
                </div>

            `;

        }


        cell.innerHTML = `

            <div class="calendar-day-number">
                ${day}
            </div>

            ${pnlHTML}

        `;


        calendarDays.appendChild(
            cell
        );

    }


    updateMonthlyStats(
        year,
        month
    );

}



function updateMonthlyStats(
    year,
    month
) {

    const monthTrades =
        getActualTrades()
            .filter(trade => {

                const date =
                    new Date(
                        trade.date
                    );


                return (

                    date.getFullYear() ===
                    year &&

                    date.getMonth() ===
                    month

                );

            });


    const pnl =
        monthTrades.reduce(
            (sum, trade) =>
                sum +
                Number(
                    trade.pnl || 0
                ),
            0
        );


    const wins =
        monthTrades.filter(
            trade =>
                trade.pnl > 0
        ).length;


    const losses =
        monthTrades.filter(
            trade =>
                trade.pnl < 0
        ).length;


    document
        .getElementById(
            "monthlyPnL"
        )
        .textContent =
            formatMoney(pnl);


    document
        .getElementById(
            "monthlyTrades"
        )
        .textContent =
            monthTrades.length;


    document
        .getElementById(
            "monthlyWins"
        )
        .textContent =
            wins;


    document
        .getElementById(
            "monthlyLosses"
        )
        .textContent =
            losses;


    updatePnLClass(
        document.getElementById(
            "monthlyPnL"
        ),
        pnl
    );

}



function showDayTrades(date) {

    const container =
        document.getElementById(
            "selectedDayTrades"
        );


    const title =
        document.getElementById(
            "selectedDayTitle"
        );


    title.textContent =
        `Trades on ${date}`;


    const dayTrades =
        getActualTrades()
            .filter(
                trade =>
                    trade.date ===
                    date
            );


    if (
        dayTrades.length === 0
    ) {

        container.innerHTML = `
            <p class="empty">
                No trades on this day.
            </p>
        `;

        return;
    }


    container.innerHTML =
        dayTrades
            .map(trade => {

                return `

                    <div class="trade-item">

                        <div class="trade-info">

                            <strong>
                                ${escapeHTML(
                                    trade.crypto
                                )}
                            </strong>

                            ${
                                trade.notes
                                    ? `
                                        <small>
                                            ${escapeHTML(
                                                trade.notes
                                            )}
                                        </small>
                                      `
                                    : ""
                            }

                        </div>

                        <div class="${getPnLClass(
                            trade.pnl
                        )}">
                            ${formatMoney(
                                trade.pnl
                            )}
                        </div>

                    </div>

                `;

            })
            .join("");

}



/* =========================================================
   STRATEGY SELECTION
   ========================================================= */

function selectStrategy(
    strategyId
) {

    selectedStrategy =
        strategyId;


    document
        .querySelectorAll(
            ".strategy-tab"
        )
        .forEach(
            tab =>
                tab.classList.remove(
                    "active"
                )
        );


    const tabs =
        document.querySelectorAll(
            ".strategy-tab"
        );


    if (
        strategyId ===
        "liquidity"
    ) {

        tabs[0]
            .classList
            .add("active");

    }


    if (
        strategyId ===
        "range"
    ) {

        tabs[1]
            .classList
            .add("active");

    }


    if (
        strategyId ===
        "failed"
    ) {

        tabs[2]
            .classList
            .add("active");

    }


    renderStrategy();

}



/* =========================================================
   RENDER STRATEGY
   ========================================================= */

function renderStrategy() {

    const strategy =
        strategies[
            selectedStrategy
        ];


    const container =
        document.getElementById(
            "strategyContent"
        );


    const stats =
        getStrategyStats(
            selectedStrategy
        );


    container.innerHTML = `


        <!-- STRATEGY HEADER -->

        <div class="strategy-header">

            <h2>
                ${strategy.name}
            </h2>

            <p>
                ${strategy.description}
            </p>

        </div>



        <!-- STRATEGY STATISTICS -->

        <div class="strategy-stats">


            <div class="strategy-stat">

                <span>
                    Tests
                </span>

                <strong>
                    ${stats.total}
                </strong>

            </div>


            <div class="strategy-stat">

                <span>
                    Wins
                </span>

                <strong>
                    ${stats.wins}
                </strong>

            </div>


            <div class="strategy-stat">

                <span>
                    Losses
                </span>

                <strong>
                    ${stats.losses}
                </strong>

            </div>


            <div class="strategy-stat">

                <span>
                    Win Rate
                </span>

                <strong>
                    ${stats.winRate}%
                </strong>

            </div>


            <div class="strategy-stat">

                <span>
                    Total R
                </span>

                <strong class="${getRClass(
                    stats.totalR
                )}">
                    ${formatR(
                        stats.totalR
                    )}
                </strong>

            </div>


            <div class="strategy-stat">

                <span>
                    Avg R / Trade
                </span>

                <strong class="${getRClass(
                    stats.averageR
                )}">
                    ${formatR(
                        stats.averageR
                    )}
                </strong>

            </div>

        </div>



        <!-- QUICK FLOW -->

        <div class="quick-flow">

            <h3>
                Quick Flow
            </h3>

            <div class="flow">
                ${strategy.flow}
            </div>

        </div>



        <!-- DETAILED GUIDE -->

        ${strategy.steps
            .map(
                (step, index) => `

                    <div class="guide-step">

                        <h3>

                            <span class="step-number">
                                ${index + 1}
                            </span>

                            ${step.title}

                        </h3>


                        <p>

                            <strong>
                                Timeframe:
                            </strong>

                            ${step.timeframe}

                        </p>


                        <p>
                            ${step.text}
                        </p>


                        <ul>

                            ${step.bullets
                                .map(
                                    bullet =>
                                        `<li>
                                            ${bullet}
                                         </li>`
                                )
                                .join("")
                            }

                        </ul>


                        <div class="tip-box">

                            <strong>
                                💡 Guide:
                            </strong>

                            ${step.tip}

                        </div>

                    </div>

                `
            )
            .join("")
        }



        <!-- RECORD RESULT -->

        <div class="result-card">

            <h2>
                Record Test Result
            </h2>

            <p>
                After taking a trade using this strategy,
                enter the Risk:Reward Ratio you actually used,
                then record whether the trade succeeded or failed.
            </p>


            <div class="result-form">

                <div>

                    <label>
                        Risk:Reward Ratio
                    </label>

                    <input
                        type="text"
                        id="rrrInput"
                        placeholder="Example: 1:3"
                    >

                    <div class="ratio-help">
                        Enter the ratio you planned,
                        such as 1:2, 1:3, or 1:4.
                    </div>

                </div>

            </div>


            <div class="result-buttons">

                <button
                    class="win-btn"
                    onclick="recordStrategyResult('WIN')"
                >
                    ✓ Succeeded
                </button>


                <button
                    class="loss-btn"
                    onclick="recordStrategyResult('LOSS')"
                >
                    ✕ Failed
                </button>

            </div>

        </div>



        <!-- HISTORY -->

        <div class="card">

            <h2>
                Test History
            </h2>

            <div class="strategy-history">

                ${renderStrategyHistoryHTML(
                    selectedStrategy
                )}

            </div>

        </div>

    `;

}



/* =========================================================
   RECORD STRATEGY RESULT
   ========================================================= */

function recordStrategyResult(
    result
) {

    const rrrInput =
        document.getElementById(
            "rrrInput"
        );


    const rrr =
        parseRRR(
            rrrInput.value
        );


    if (
        rrr === null
    ) {

        alert(
            "Please enter a valid Risk:Reward Ratio, such as 1:2, 1:3, or 1:4."
        );

        return;
    }


    const today =
        new Date();


    const date =
        `${today.getFullYear()}-${String(
            today.getMonth() + 1
        ).padStart(2, "0")}-${String(
            today.getDate()
        ).padStart(2, "0")}`;


    const time =
        today.toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    /*
       If the trade wins:

       1:3 = +3R

       If the trade loses:

       1:3 = -1R
    */

    const resultR =
        result === "WIN"
            ? rrr
            : -1;


    const strategyTest = {

        id: Date.now(),

        type: "strategy",

        date: date,

        time: time,

        strategyId:
            selectedStrategy,

        strategyResult:
            result,

        rrr:
            rrr,

        resultR:
            resultR,

        pnl: null

    };


    trades.push(
        strategyTest
    );


    saveTrades();


    renderStrategy();

    renderStrategyComparison();

}



/* =========================================================
   PARSE RRR
   ========================================================= */

function parseRRR(value) {

    if (!value) {

        return null;

    }


    value =
        value
            .trim()
            .replace(/\s/g, "");


    /*
       Accept:

       1:2
       1:3
       1:4

       Also accept:

       2
       3
       4

       A number means
       1:number.
    */


    if (
        /^\d+(\.\d+)?$/.test(
            value
        )
    ) {

        const reward =
            parseFloat(value);


        if (
            reward <= 0
        ) {

            return null;

        }


        return reward;

    }


    const parts =
        value.split(":");


    if (
        parts.length !== 2
    ) {

        return null;

    }


    const risk =
        parseFloat(
            parts[0]
        );


    const reward =
        parseFloat(
            parts[1]
        );


    if (
        !Number.isFinite(risk) ||
        !Number.isFinite(reward) ||
        risk <= 0 ||
        reward <= 0
    ) {

        return null;

    }


    /*
       Convert:

       1:3 → 3R

       2:6 → 3R
    */

    return reward / risk;

}



/* =========================================================
   STRATEGY STATISTICS
   ========================================================= */

function getStrategyStats(
    strategyId
) {

    const tests =
        getStrategyTests(
            strategyId
        );


    const wins =
        tests.filter(
            trade =>
                trade.strategyResult ===
                "WIN"
        ).length;


    const losses =
        tests.filter(
            trade =>
                trade.strategyResult ===
                "LOSS"
        ).length;


    const total =
        tests.length;


    const totalR =
        tests.reduce(
            (sum, trade) =>
                sum +
                Number(
                    trade.resultR || 0
                ),
            0
        );


    const averageR =
        total > 0
            ? totalR / total
            : 0;


    const winRate =
        total > 0
            ? (
                (wins / total) *
                100
            ).toFixed(1)
            : "0.0";


    /*
       Expectancy:

       (Win Rate × Average Win R)
       +
       (Loss Rate × Average Loss R)

       Since every loss is -1R,
       the average loss is -1R.

       This is essentially the
       average R gained/lost per trade.
    */

    const expectancy =
        averageR;


    const winningR =
        tests
            .filter(
                trade =>
                    trade.strategyResult ===
                    "WIN"
            )
            .reduce(
                (sum, trade) =>
                    sum +
                    Number(
                        trade.resultR || 0
                    ),
                0
            );


    const losingR =
        tests
            .filter(
                trade =>
                    trade.strategyResult ===
                    "LOSS"
            )
            .reduce(
                (sum, trade) =>
                    sum +
                    Math.abs(
                        Number(
                            trade.resultR || 0
                        )
                    ),
                0
            );


    const profitFactor =
        losingR > 0
            ? winningR / losingR
            : winningR > 0
                ? Infinity
                : 0;


    return {

        total,

        wins,

        losses,

        winRate,

        totalR,

        averageR,

        expectancy,

        winningR,

        losingR,

        profitFactor

    };

}



/* =========================================================
   STRATEGY HISTORY
   ========================================================= */

function renderStrategyHistoryHTML(
    strategyId
) {

    const tests =
        getStrategyTests(
            strategyId
        )
        .sort(
            (a, b) =>
                b.id - a.id
        );


    if (
        tests.length === 0
    ) {

        return `
            <p class="empty">
                No strategy tests recorded yet.
            </p>
        `;

    }


    return tests
        .map(test => {

            const isWin =
                test.strategyResult ===
                "WIN";


            const resultClass =
                isWin
                    ? "profit"
                    : "loss";


            const resultText =
                isWin
                    ? "Succeeded"
                    : "Failed";


            return `

                <div class="trade-item">

                    <div class="trade-info">

                        <strong
                            class="${resultClass}"
                        >
                            ${resultText}
                        </strong>


                        <small>
                            ${test.date}
                            at
                            ${test.time}
                        </small>


                        <small>
                            Risk:Reward
                            1:${Number(
                                test.rrr
                            ).toFixed(2)}
                        </small>

                    </div>


                    <div>

                        <div
                            class="history-r
                            ${getRClass(
                                test.resultR
                            )}"
                        >
                            ${formatR(
                                test.resultR
                            )}
                        </div>


                        <button
                            onclick="deleteTrade(
                                ${test.id}
                            )"
                            style="
                                display:block;
                                margin-top:8px;
                                border:none;
                                background:none;
                                color:#dc2626;
                                cursor:pointer;
                            "
                        >
                            Delete
                        </button>

                    </div>

                </div>

            `;

        })
        .join("");

}



/* =========================================================
   STRATEGY COMPARISON
   ========================================================= */

function renderStrategyComparison() {

    const container =
        document.getElementById(
            "strategyComparison"
        );


    if (!container) {

        return;

    }


    const strategyIds = [
        "liquidity",
        "range",
        "failed"
    ];


    const rows =
        strategyIds
            .map(
                strategyId => {

                    const strategy =
                        strategies[
                            strategyId
                        ];


                    const stats =
                        getStrategyStats(
                            strategyId
                        );


                    return `

                        <tr>

                            <td>
                                <strong>
                                    ${strategy.name}
                                </strong>
                            </td>


                            <td>
                                ${stats.total}
                            </td>


                            <td>
                                ${stats.wins}
                            </td>


                            <td>
                                ${stats.losses}
                            </td>


                            <td>
                                ${stats.winRate}%
                            </td>


                            <td class="${getRClass(
                                stats.totalR
                            )}">
                                ${formatR(
                                    stats.totalR
                                )}
                            </td>


                            <td class="${getRClass(
                                stats.averageR
                            )}">
                                ${formatR(
                                    stats.averageR
                                )}
                            </td>


                            <td>
                                ${formatProfitFactor(
                                    stats.profitFactor
                                )}
                            </td>

                        </tr>

                    `;

                }
            )
            .join("");


    container.innerHTML = `

        <table class="comparison-table">

            <thead>

                <tr>

                    <th>
                        Strategy
                    </th>

                    <th>
                        Tests
                    </th>

                    <th>
                        Wins
                    </th>

                    <th>
                        Losses
                    </th>

                    <th>
                        Win Rate
                    </th>

                    <th>
                        Total R
                    </th>

                    <th>
                        Avg R / Trade
                    </th>

                    <th>
                        Profit Factor
                    </th>

                </tr>

            </thead>


            <tbody>

                ${rows}

            </tbody>

        </table>


        <p
            style="
                margin-top:15px;
                color:#6b7280;
                font-size:13px;
                line-height:1.6;
            "
        >
            <strong>How to read this:</strong>
            Total R shows the accumulated result from
            your strategy tests. Avg R / Trade shows the
            average result per test. Profit Factor compares
            total winning R with total losing R.
            Collect enough trades before drawing conclusions
            from the numbers.
        </p>

    `;

}



/* =========================================================
   DATA HELPERS
   ========================================================= */

function getActualTrades() {

    return trades.filter(
        trade =>
            trade.type === "actual" ||
            (
                trade.type === undefined &&
                trade.strategyId === null
            )
    );

}



function getStrategyTests(
    strategyId
) {

    return trades.filter(
        trade =>
            trade.strategyId ===
            strategyId
    );

}



/* =========================================================
   FORMATTING
   ========================================================= */

function formatMoney(
    value
) {

    const number =
        Number(value) || 0;


    return `$${number.toFixed(2)}`;

}



function formatR(
    value
) {

    const number =
        Number(value) || 0;


    if (
        number > 0
    ) {

        return `+${number.toFixed(2)}R`;

    }


    return `${number.toFixed(2)}R`;

}



function formatProfitFactor(
    value
) {

    if (
        value === Infinity
    ) {

        return "∞";

    }


    if (
        value === 0
    ) {

        return "0.00";

    }


    return value.toFixed(2);

}



function getPnLClass(
    value
) {

    if (
        Number(value) > 0
    ) {

        return "profit";

    }


    if (
        Number(value) < 0
    ) {

        return "loss";

    }


    return "break-even";

}



function getRClass(
    value
) {

    if (
        Number(value) > 0
    ) {

        return "positive-r";

    }


    if (
        Number(value) < 0
    ) {

        return "negative-r";

    }


    return "neutral-r";

}



function updatePnLClass(
    element,
    value
) {

    element.classList.remove(
        "profit",
        "loss",
        "break-even"
    );


    element.classList.add(
        getPnLClass(value)
    );

}



function escapeHTML(
    value
) {

    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}



/* =========================================================
   DATE
   ========================================================= */

function setTodayDate() {

    const now =
        new Date();


    const date =
        `${now.getFullYear()}-${String(
            now.getMonth() + 1
        ).padStart(2, "0")}-${String(
            now.getDate()
        ).padStart(2, "0")}`;


    document
        .getElementById(
            "tradeDate"
        )
        .value =
            date;

}



/* =========================================================
   INITIALIZE
   ========================================================= */

setTodayDate();

updateDashboard();

renderTradeHistory();

renderCalendar();

renderStrategy();

renderStrategyComparison();
