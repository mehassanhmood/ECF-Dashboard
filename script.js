document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('content');
    if (!content) {
        console.error('Content container not found!');
        return;
    }

    // Section rendering functions
    const sections = {
        dashboard: () => `
            <div class="section" id="dashboard">
                <h1>📊 Dashboard Overview</h1>
                <p>Real-time insights into your business performance</p>
                <div class="grid-container">
                    <div class="card metric">
                        <h2>💰 Monthly Revenue</h2>
                        <p id="monthly-revenue">$485,230</p>
                    </div>
                    <div class="card metric">
                        <h2>✅ Quality Pass Rate</h2>
                        <p>94%</p>
                    </div>
                    <div class="card metric">
                        <h2>🚚 Active Contractors</h2>
                        <p>12</p>
                    </div>
                    <div class="card metric">
                        <h2>📈 Growth Rate</h2>
                        <p>+12.5%</p>
                    </div>
                </div>
                <div class="card">
                    <h2>🏭 Manufacturing Status</h2>
                    <div class="grid-container">
                        <div class="metric">
                            <h3>Raw Materials</h3>
                            <progress value="85" max="100"></progress>
                            <p>85%</p>
                        </div>
                        <div class="metric">
                            <h3>Finished Goods</h3>
                            <progress value="67" max="100"></progress>
                            <p>67%</p>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h2>⚠️ Key Alerts</h2>
                    <p class="alert">Low Stock Items: 3 Items require immediate attention</p>
                    <p class="alert">Overdue Payments: $12,500 pending collection</p>
                    <p class="alert">Equipment Maintenance: Scheduled for next week</p>
                </div>
            </div>
        `,
        manufacturing: () => `
            <div class="section" id="manufacturing">
                <h1>🏭 Manufacturing Management</h1>
                <p>Monitor inventory levels and quality control</p>
                <div class="card">
                    <h2>📦 Raw Material Inventory</h2>
                    <table>
                        <tr><th>Material</th><th>Current Level</th><th>Reorder Point</th><th>Status</th></tr>
                        <tr><td>Steel Sheets</td><td>850 units</td><td>500 units</td><td>Good</td></tr>
                        <tr><td>Aluminum Rods</td><td>120 units</td><td>200 units</td><td>Low</td></tr>
                        <tr><td>Plastic Components</td><td>2,500 units</td><td>1,000 units</td><td>Good</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h2>✅ Quality Control Dashboard</h2>
                    <canvas id="quality-control-chart"></canvas>
                    <div class="grid-container">
                        <div class="metric"><h3>Pass Rate</h3><p>94.2%</p></div>
                        <div class="metric"><h3>Defect Rate</h3><p>5.8%</p></div>
                    </div>
                </div>
            </div>
        `,
        logistics: () => `
            <div class="section" id="logistics">
                <h1>🚚 Logistics Management</h1>
                <p>Manage contractors and shipping services</p>
                <div class="card">
                    <h2>🚚 Contractor Directory</h2>
                    <table>
                        <tr><th>Contractor</th><th>Services</th><th>Distance</th><th>Rating</th><th>Action</th></tr>
                        <tr><td>FastShip Logistics</td><td>Express Delivery</td><td>25 km</td><td>⭐ 4.8/5</td><td><button>Get Quote</button></td></tr>
                        <tr><td>Regional Transport</td><td>Bulk Transport</td><td>45 km</td><td>⭐ 4.5/5</td><td><button>Get Quote</button></td></tr>
                        <tr><td>City Movers</td><td>Local Delivery</td><td>15 km</td><td>⭐ 4.2/5</td><td><button>Get Quote</button></td></tr>
                    </table>
                </div>
                <div class="card">
                    <h2>💰 Service Quote Calculator</h2>
                    <label>Service Type:</label>
                    <select>
                        <option>Express Delivery</option>
                        <option>Standard Delivery</option>
                        <option>Bulk Transport</option>
                        <option>Refrigerated Transport</option>
                    </select>
                    <label>Distance (km):</label>
                    <input type="number" placeholder="Enter distance">
                    <label>Weight (kg):</label>
                    <input type="number" placeholder="Enter weight">
                    <button>Calculate Quote</button>
                </div>
            </div>
        `,
        suppliers: () => `
            <div class="section" id="suppliers">
                <h1>📦 Supplier Management</h1>
                <p>Track supplier relationships and procurement</p>
                <div class="card">
                    <h2>🏢 Supplier Directory</h2>
                    <table>
                        <tr><th>Supplier</th><th>Lead Time</th><th>Min Order</th><th>Distance</th><th>Quality</th></tr>
                        <tr><td>SteelCorp Industries</td><td>7 days</td><td>500 units</td><td>120 km</td><td>A+</td></tr>
                        <tr><td>MetalWorks Ltd</td><td>14 days</td><td>200 units</td><td>85 km</td><td>A</td></tr>
                        <tr><td>PlasticTech Solutions</td><td>5 days</td><td>1000 units</td><td>65 km</td><td>B+</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h2>📋 Procurement Dashboard</h2>
                    <div class="grid-container">
                        <div class="metric"><h3>Active Orders</h3><p>15</p></div>
                        <div class="metric"><h3>Pending Approvals</h3><p>3</p></div>
                        <div class="metric"><h3>Total Value</h3><p>$245,800</p></div>
                    </div>
                    <button>New Purchase Order</button>
                </div>
            </div>
        `,
        sales: () => `
            <div class="section" id="sales">
                <h1>💰 Sales Analytics</h1>
                <p>Analyze sales performance and trends</p>
                <div class="card">
                    <h2>📊 Sales by Customer Segment</h2>
                    <canvas id="customer-segment-chart"></canvas>
                    <div class="grid-container">
                        <div class="metric"><h3>Enterprise</h3><p>$285,400</p></div>
                        <div class="metric"><h3>SMB</h3><p>$142,800</p></div>
                        <div class="metric"><h3>Individual</h3><p>$57,030</p></div>
                    </div>
                </div>
                <div class="card">
                    <h2>📦 Product Performance</h2>
                    <table>
                        <tr><th>Product</th><th>Units Sold</th><th>Revenue</th><th>Growth</th></tr>
                        <tr><td>Product A</td><td>1,250</td><td>$250,000</td><td>+15%</td></tr>
                        <tr><td>Product B</td><td>850</td><td>$170,000</td><td>+8%</td></tr>
                        <tr><td>Product C</td><td>420</td><td>$65,230</td><td>-2%</td></tr>
                    </table>
                </div>
            </div>
        `,
        revenue: () => `
            <div class="section" id="revenue">
                <h1>📈 Revenue & Financial Analysis</h1>
                <p>Monitor financial performance and profitability</p>
                <div class="card">
                    <h2>💰 Financial Summary</h2>
                    <div class="grid-container">
                        <div class="metric"><h3>Gross Sales</h3><p>$485,230</p></div>
                        <div class="metric"><h3>Manufacturing Cost</h3><p>$245,800</p></div>
                        <div class="metric"><h3>Operating Cost</h3><p>$89,650</p></div>
                        <div class="metric"><h3>Net Profit</h3><p>$87,450</p></div>
                    </div>
                </div>
                <div class="card">
                    <h2>📈 Revenue Trend</h2>
                    <canvas id="revenue-trend-chart"></canvas>
                    <div class="grid-container">
                        <div class="metric"><h3>Monthly Growth</h3><p>+12.5%</p></div>
                        <div class="metric"><h3>Profit Margin</h3><p>18.02%</p></div>
                    </div>
                </div>
            </div>
        `,
        forecasting: () => `
            <div class="section" id="forecasting">
                <h1>🔮 Sales Forecasting</h1>
                <p>Predict future sales trends and performance</p>
                <div class="card">
                    <h2>⚙️ Forecast Settings</h2>
                    <label>Forecasting Method:</label>
                    <select>
                        <option>Ad Hoc Analysis</option>
                        <option>Third-Party Contractor</option>
                        <option>Machine Learning Model</option>
                        <option>Historical Trending</option>
                    </select>
                    <label>Forecast Period:</label>
                    <select>
                        <option>Next Quarter</option>
                        <option>Next 6 Months</option>
                        <option>Next Year</option>
                    </select>
                    <button onclick="alert('Forecast generation not implemented yet.')">Generate Forecast</button>
                </div>
                <div class="card">
                    <h2>🔮 Forecast Results</h2>
                    <canvas id="sales-forecast-chart"></canvas>
                    <div class="grid-container">
                        <div class="metric"><h3>Next Month Projection</h3><p>$512,400</p></div>
                        <div class="metric"><h3>Confidence Level</h3><p>87%</p></div>
                        <div class="metric"><h3>Trend Direction</h3><p>📈 Upward</p></div>
                    </div>
                </div>
            </div>
        `,
        customers: () => `
            <div class="section" id="customers">
                <h1>👥 Customer Management</h1>
                <p>Manage customer relationships and track performance</p>
                <div class="card">
                    <h2>👥 Customer Overview</h2>
                    <div class="grid-container">
                        <div class="metric"><h3>Total Customers</h3><p>156</p></div>
                        <div class="metric"><h3>Active This Month</h3><p>124</p></div>
                        <div class="metric"><h3>Avg. Order Value</h3><p>$3,890</p></div>
                        <div class="metric"><h3>Retention Rate</h3><p>89.5%</p></div>
                    </div>
                </div>
                <div class="card">
                    <h2>📊 Top Customers</h2>
                    <table>
                        <tr><th>Customer</th><th>Location</th><th>Monthly Sales</th><th>YTD Sales</th><th>Status</th></tr>
                        <tr><td>TechCorp Inc.</td><td>New York, NY</td><td>$45,600</td><td>$547,200</td><td>Active</td></tr>
                        <tr><td>Manufacturing Ltd.</td><td>Chicago, IL</td><td>$32,800</td><td>$393,600</td><td>Active</td></tr>
                        <tr><td>StartUp Solutions</td><td>Austin, TX</td><td>$8,900</td><td>$106,800</td><td>Inactive</td></tr>
                    </table>
                </div>
            </div>
        `,
        operations: () => `
            <div class="section" id="operations">
                <h1>⚙️ Operational Costs</h1>
                <p>Monitor and analyze operational expenses</p>
                <div class="card">
                    <h2>👨‍💼 Human Resources</h2>
                    <div class="grid-container">
                        <div class="metric"><h3>Payroll</h3><p>$45,600</p></div>
                        <div class="metric"><h3>Employee Benefits</h3><p>$12,400</p></div>
                        <div class="metric"><h3>Payroll Taxes</h3><p>$8,950</p></div>
                    </div>
                </div>
                <div class="card">
                    <h2>🏢 Facility & Equipment</h2>
                    <div class="grid-container">
                        <div class="metric"><h3>Rent</h3><p>$8,500</p></div>
                        <div class="metric"><h3>Equipment Maintenance</h3><p>$3,200</p></div>
                        <div class="metric"><h3>Utilities</h3><p>$2,850</p></div>
                        <div class="metric"><h3>Insurance</h3><p>$1,800</p></div>
                    </div>
                </div>
                <div class="card">
                    <h2>💼 Operational Expenses</h2>
                    <table>
                        <tr><th>Expense Category</th><th>Monthly Cost</th><th>% of Total</th><th>Trend</th></tr>
                        <tr><td>Raw Material Cost</td><td>$89,600</td><td>45.2%</td><td>📈 +3%</td></tr>
                        <tr><td>Logistics Cost</td><td>$12,300</td><td>6.2%</td><td>📊 +1%</td></tr>
                        <tr><td>Holding Cost</td><td>$5,400</td><td>2.7%</td><td>📉 -2%</td></tr>
                        <tr><td>Travel Expenses</td><td>$3,800</td><td>1.9%</td><td>📈 +5%</td></tr>
                    </table>
                </div>
                <div class="card">
                    <h2>📊 Cost Analysis</h2>
                    <canvas id="cost-breakdown-chart"></canvas>
                    <div class="grid-container">
                        <div class="metric"><h3>Total Monthly Costs</h3><p>$198,350</p></div>
                        <div class="metric"><h3>Cost vs Revenue</h3><p>40.9%</p></div>
                    </div>
                </div>
            </div>
        `
    };

    // Render section based on hash
    function renderSection() {
        const hash = window.location.hash.slice(1) || 'dashboard';
        content.innerHTML = sections[hash] ? sections[hash]() : sections.dashboard();
        try {
            if (hash === 'manufacturing') initQualityControlChart();
            if (hash === 'sales') initCustomerSegmentChart();
            if (hash === 'revenue') initRevenueTrendChart();
            if (hash === 'forecasting') initSalesForecastChart();
            if (hash === 'operations') initCostBreakdownChart();
        } catch (error) {
            console.error('Error initializing charts:', error);
        }
    }

    // Chart initialization functions
    function initQualityControlChart() {
        const ctx = document.getElementById('quality-control-chart');
        if (!ctx) {
            console.error('Quality control chart canvas not found');
            return;
        }
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Pass Rate', 'Defect Rate'],
                datasets: [{ data: [94.2, 5.8], backgroundColor: ['#36A2EB', '#FF6384'] }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Quality Control Metrics' } }
            }
        });
    }

    function initCustomerSegmentChart() {
        const ctx = document.getElementById('customer-segment-chart');
        if (!ctx) {
            console.error('Customer segment chart canvas not found');
            return;
        }
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Enterprise', 'SMB', 'Individual'],
                datasets: [{ label: 'Sales ($)', data: [285400, 142800, 57030], backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0'] }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales by Customer Segment' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function initRevenueTrendChart() {
        const ctx = document.getElementById('revenue-trend-chart');
        if (!ctx) {
            console.error('Revenue trend chart canvas not found');
            return;
        }
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{ label: 'Revenue ($)', data: [400000, 420000, 450000, 470000, 485230], borderColor: '#36A2EB', fill: false }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Monthly Revenue Trend' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function initSalesForecastChart() {
        const ctx = document.getElementById('sales-forecast-chart');
        if (!ctx) {
            console.error('Sales forecast chart canvas not found');
            return;
        }
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Current', 'Next Month', 'Next Quarter'],
                datasets: [{ label: 'Projected Sales ($)', data: [485230, 512400, 550000], borderColor: '#4BC0C0', fill: false }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Sales Forecast' } },
                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function initCostBreakdownChart() {
        const ctx = document.getElementById('cost-breakdown-chart');
        if (!ctx) {
            console.error('Cost breakdown chart canvas not found');
            return;
        }
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Raw Materials', 'Logistics', 'Payroll', 'Rent', 'Other'],
                datasets: [{ data: [89600, 12300, 45600, 8500, 25900], backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0', '#FF6384', '#9966FF'] }]
            },
            options: {
                responsive: true,
                plugins: { legend: { position: 'top' }, title: { display: true, text: 'Monthly Cost Breakdown' } }
            }
        });
    }

    // Dynamic revenue update
    setInterval(() => {
        const randomMetric = document.getElementById('monthly-revenue');
        if (randomMetric) {
            const currentValue = parseFloat(randomMetric.textContent.replace(/[$,]/g, ''));
            if (!isNaN(currentValue)) {
                const change = (Math.random() - 0.5) * 1000;
                const newValue = Math.max(0, currentValue + change);
                randomMetric.textContent = '$' + newValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            }
        } else {
            console.warn('Monthly revenue element not found');
        }
    }, 5000);

    // Card hover effects
    document.addEventListener('mouseover', (e) => {
        const card = e.target.closest('.card');
        if (card) card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    document.addEventListener('mouseout', (e) => {
        const card = e.target.closest('.card');
        if (card) card.style.transform = 'translateY(0) scale(1)';
    });

    // Render initial section and handle navigation
    window.addEventListener('hashchange', renderSection);
    renderSection();
});