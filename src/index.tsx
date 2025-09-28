import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-pages'

type Bindings = {
  DB?: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

// Enable CORS
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// API Routes
app.get('/api/campaigns', async (c) => {
  // Mock data for now
  const campaigns = [
    {
      id: 1,
      name: 'حملة رمضان 2024',
      status: 'active',
      budget: 50000,
      spent: 32000,
      impressions: 1250000,
      clicks: 45000,
      conversions: 890
    },
    {
      id: 2,
      name: 'حملة الصيف المميز',
      status: 'active',
      budget: 35000,
      spent: 15000,
      impressions: 750000,
      clicks: 28000,
      conversions: 560
    },
    {
      id: 3,
      name: 'Black Friday 2024',
      status: 'scheduled',
      budget: 80000,
      spent: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0
    }
  ]
  
  return c.json({ campaigns })
})

app.get('/api/analytics', async (c) => {
  const analytics = {
    totalRevenue: 2850000,
    totalSpend: 47000,
    roi: 5.96,
    totalCampaigns: 12,
    activeCampaigns: 3,
    totalClients: 45,
    performance: {
      labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
      revenue: [380000, 420000, 510000, 480000, 550000, 510000],
      spend: [6500, 7200, 8500, 7800, 9000, 8000]
    }
  }
  
  return c.json(analytics)
})

app.post('/api/campaigns', async (c) => {
  const data = await c.req.json()
  // TODO: Save to D1 database
  return c.json({ success: true, message: 'تم إنشاء الحملة بنجاح!', data })
})

app.get('/api/services', async (c) => {
  const services = [
    {
      id: 1,
      title: 'إدارة حملات السوشيال ميديا',
      description: 'إدارة احترافية لحملاتك على جميع منصات التواصل الاجتماعي',
      icon: 'fab fa-facebook',
      price: 'يبدأ من 15,000 جنيه/شهر'
    },
    {
      id: 2,
      title: 'تصميم الهوية البصرية',
      description: 'تصميم هوية بصرية متكاملة تعكس قيمة علامتك التجارية',
      icon: 'fas fa-palette',
      price: 'يبدأ من 25,000 جنيه'
    },
    {
      id: 3,
      title: 'إنتاج المحتوى الإبداعي',
      description: 'محتوى إبداعي يجذب جمهورك ويحقق أهدافك',
      icon: 'fas fa-video',
      price: 'يبدأ من 20,000 جنيه/شهر'
    },
    {
      id: 4,
      title: 'حملات Google Ads',
      description: 'إعلانات جوجل مدفوعة تحقق نتائج فورية',
      icon: 'fab fa-google',
      price: 'يبدأ من 10,000 جنيه/شهر'
    },
    {
      id: 5,
      title: 'تحليل البيانات والتقارير',
      description: 'تقارير تفصيلية وتحليلات عميقة لقياس الأداء',
      icon: 'fas fa-chart-line',
      price: 'يبدأ من 8,000 جنيه/شهر'
    },
    {
      id: 6,
      title: 'التسويق بالمؤثرين',
      description: 'ربطك بأفضل المؤثرين المناسبين لعلامتك التجارية',
      icon: 'fas fa-star',
      price: 'حسب المؤثر'
    }
  ]
  
  return c.json({ services })
})

// Main HTML Page
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Boostly Glow Forge - ميديا ترند للتسويق الرقمي</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; }
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .card-hover {
                transition: all 0.3s ease;
            }
            .card-hover:hover {
                transform: translateY(-5px);
                box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            }
            .glow {
                animation: glow 2s ease-in-out infinite;
            }
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.5); }
                50% { box-shadow: 0 0 40px rgba(102, 126, 234, 0.8); }
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16">
                    <div class="flex items-center">
                        <i class="fas fa-rocket text-purple-600 text-2xl ml-2"></i>
                        <span class="text-xl font-bold text-gray-800">Boostly Glow Forge</span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <a href="#services" class="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium">خدماتنا</a>
                        <a href="#analytics" class="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium">التحليلات</a>
                        <a href="#campaigns" class="text-gray-600 hover:text-purple-600 px-3 py-2 rounded-md font-medium">الحملات</a>
                        <button onclick="window.location.href='/dashboard'" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                            <i class="fas fa-chart-line ml-2"></i>لوحة التحكم
                        </button>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white py-20">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 class="text-5xl font-bold mb-4">
                    <i class="fas fa-fire animate-pulse text-yellow-400"></i>
                    أشعل نجاح علامتك التجارية
                </h1>
                <p class="text-xl mb-8">منصة ميديا ترند المتكاملة للتسويق الرقمي والنمو السريع</p>
                <div class="flex justify-center space-x-4">
                    <button onclick="scrollToSection('services')" class="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 glow">
                        ابدأ رحلتك معنا
                    </button>
                    <button onclick="showDemo()" class="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-purple-600">
                        شاهد العرض التجريبي
                    </button>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="py-10 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="text-center">
                        <div class="text-4xl font-bold text-purple-600">+500</div>
                        <div class="text-gray-600">عميل سعيد</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-purple-600">+1200</div>
                        <div class="text-gray-600">حملة ناجحة</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-purple-600">95%</div>
                        <div class="text-gray-600">رضا العملاء</div>
                    </div>
                    <div class="text-center">
                        <div class="text-4xl font-bold text-purple-600">10M+</div>
                        <div class="text-gray-600">مشاهدة شهرياً</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section id="services" class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-briefcase text-purple-600 ml-2"></i>
                    خدماتنا المميزة
                </h2>
                <div id="services-grid" class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Services will be loaded dynamically -->
                </div>
            </div>
        </section>

        <!-- Analytics Preview -->
        <section id="analytics" class="py-16 bg-white">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-chart-bar text-purple-600 ml-2"></i>
                    نتائج مذهلة بالأرقام
                </h2>
                <div id="analytics-cards" class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <!-- Analytics cards will be loaded dynamically -->
                </div>
                <div class="bg-gray-50 rounded-xl p-8">
                    <canvas id="performanceChart" width="400" height="200"></canvas>
                </div>
            </div>
        </section>

        <!-- Campaigns Section -->
        <section id="campaigns" class="py-16 bg-gray-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-bullhorn text-purple-600 ml-2"></i>
                    أحدث الحملات النشطة
                </h2>
                <div id="campaigns-list" class="space-y-6">
                    <!-- Campaigns will be loaded dynamically -->
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="gradient-bg text-white py-16">
            <div class="max-w-4xl mx-auto px-4 text-center">
                <h2 class="text-3xl font-bold mb-4">جاهز لتنمية أعمالك؟</h2>
                <p class="text-xl mb-8">انضم لأكثر من 500 عميل يثقون بنا في تحقيق نجاحهم</p>
                <button onclick="showContactForm()" class="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 text-lg glow">
                    احصل على استشارة مجانية
                </button>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center">
                    <div>
                        <div class="flex items-center mb-2">
                            <i class="fas fa-rocket text-purple-400 text-2xl ml-2"></i>
                            <span class="text-xl font-bold">Boostly Glow Forge</span>
                        </div>
                        <p class="text-gray-400">ميديا ترند - شريكك في النجاح الرقمي</p>
                    </div>
                    <div class="flex space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-facebook text-2xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-twitter text-2xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-instagram text-2xl"></i></a>
                        <a href="#" class="text-gray-400 hover:text-white"><i class="fab fa-linkedin text-2xl"></i></a>
                    </div>
                </div>
                <div class="mt-4 pt-4 border-t border-gray-700 text-center text-gray-400">
                    <p>© 2024 Boostly Glow Forge. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            // Load Services
            async function loadServices() {
                try {
                    const response = await axios.get('/api/services');
                    const services = response.data.services;
                    const grid = document.getElementById('services-grid');
                    
                    grid.innerHTML = services.map(service => \`
                        <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
                            <div class="text-purple-600 text-4xl mb-4">
                                <i class="\${service.icon}"></i>
                            </div>
                            <h3 class="text-xl font-bold text-gray-800 mb-2">\${service.title}</h3>
                            <p class="text-gray-600 mb-4">\${service.description}</p>
                            <p class="text-purple-600 font-bold">\${service.price}</p>
                        </div>
                    \`).join('');
                } catch (error) {
                    console.error('Error loading services:', error);
                }
            }

            // Load Analytics
            async function loadAnalytics() {
                try {
                    const response = await axios.get('/api/analytics');
                    const data = response.data;
                    
                    // Display analytics cards
                    const cardsContainer = document.getElementById('analytics-cards');
                    cardsContainer.innerHTML = \`
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <div class="text-green-500 text-3xl mb-2"><i class="fas fa-money-bill-wave"></i></div>
                            <div class="text-3xl font-bold text-gray-800">\${(data.totalRevenue / 1000).toFixed(0)}K جنيه</div>
                            <div class="text-gray-600">إجمالي الإيرادات</div>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <div class="text-blue-500 text-3xl mb-2"><i class="fas fa-chart-line"></i></div>
                            <div class="text-3xl font-bold text-gray-800">\${data.roi}x</div>
                            <div class="text-gray-600">عائد الاستثمار</div>
                        </div>
                        <div class="bg-white rounded-xl shadow-lg p-6">
                            <div class="text-purple-500 text-3xl mb-2"><i class="fas fa-users"></i></div>
                            <div class="text-3xl font-bold text-gray-800">\${data.totalClients}</div>
                            <div class="text-gray-600">عميل نشط</div>
                        </div>
                    \`;
                    
                    // Create performance chart
                    const ctx = document.getElementById('performanceChart').getContext('2d');
                    new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: data.performance.labels,
                            datasets: [{
                                label: 'الإيرادات (بالآلاف)',
                                data: data.performance.revenue.map(r => r / 1000),
                                borderColor: 'rgb(147, 51, 234)',
                                backgroundColor: 'rgba(147, 51, 234, 0.1)',
                                tension: 0.4
                            }]
                        },
                        options: {
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top',
                                }
                            }
                        }
                    });
                } catch (error) {
                    console.error('Error loading analytics:', error);
                }
            }

            // Load Campaigns
            async function loadCampaigns() {
                try {
                    const response = await axios.get('/api/campaigns');
                    const campaigns = response.data.campaigns;
                    const list = document.getElementById('campaigns-list');
                    
                    list.innerHTML = campaigns.map(campaign => {
                        const progress = (campaign.spent / campaign.budget) * 100;
                        const statusColor = campaign.status === 'active' ? 'green' : 'yellow';
                        const statusText = campaign.status === 'active' ? 'نشطة' : 'مجدولة';
                        
                        return \`
                            <div class="bg-white rounded-xl shadow-lg p-6">
                                <div class="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 class="text-xl font-bold text-gray-800">\${campaign.name}</h3>
                                        <span class="inline-block px-3 py-1 rounded-full text-sm font-medium bg-\${statusColor}-100 text-\${statusColor}-800 mt-2">
                                            \${statusText}
                                        </span>
                                    </div>
                                    <button class="text-purple-600 hover:text-purple-800">
                                        <i class="fas fa-chart-bar text-2xl"></i>
                                    </button>
                                </div>
                                <div class="grid grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <div class="text-gray-600 text-sm">الميزانية</div>
                                        <div class="font-bold">\${campaign.budget.toLocaleString()} جنيه</div>
                                    </div>
                                    <div>
                                        <div class="text-gray-600 text-sm">المصروف</div>
                                        <div class="font-bold">\${campaign.spent.toLocaleString()} جنيه</div>
                                    </div>
                                    <div>
                                        <div class="text-gray-600 text-sm">النقرات</div>
                                        <div class="font-bold">\${campaign.clicks.toLocaleString()}</div>
                                    </div>
                                    <div>
                                        <div class="text-gray-600 text-sm">التحويلات</div>
                                        <div class="font-bold">\${campaign.conversions.toLocaleString()}</div>
                                    </div>
                                </div>
                                <div class="bg-gray-200 rounded-full h-2">
                                    <div class="bg-purple-600 rounded-full h-2" style="width: \${progress}%"></div>
                                </div>
                            </div>
                        \`;
                    }).join('');
                } catch (error) {
                    console.error('Error loading campaigns:', error);
                }
            }

            // Utility functions
            function scrollToSection(sectionId) {
                document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
            }

            function showDemo() {
                alert('سيتم إطلاق العرض التجريبي قريباً! 🚀');
            }

            function showContactForm() {
                alert('نموذج الاتصال سيكون متاحاً قريباً! 📧');
            }

            // Load all data on page load
            document.addEventListener('DOMContentLoaded', () => {
                loadServices();
                loadAnalytics();
                loadCampaigns();
            });
        </script>
    </body>
    </html>
  `)
})

// Dashboard Page
app.get('/dashboard', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ar" dir="rtl">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>لوحة التحكم - Boostly Glow Forge</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Cairo', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-100">
        <!-- Sidebar -->
        <div class="flex h-screen">
            <aside class="w-64 bg-gray-800 text-white">
                <div class="p-4 border-b border-gray-700">
                    <div class="flex items-center">
                        <i class="fas fa-rocket text-purple-400 text-2xl ml-2"></i>
                        <span class="text-xl font-bold">Boostly</span>
                    </div>
                </div>
                <nav class="p-4">
                    <a href="#" class="flex items-center p-3 rounded-lg bg-purple-600 mb-2">
                        <i class="fas fa-home ml-3"></i>
                        <span>لوحة التحكم</span>
                    </a>
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 mb-2">
                        <i class="fas fa-bullhorn ml-3"></i>
                        <span>الحملات</span>
                    </a>
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 mb-2">
                        <i class="fas fa-users ml-3"></i>
                        <span>العملاء</span>
                    </a>
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 mb-2">
                        <i class="fas fa-chart-bar ml-3"></i>
                        <span>التقارير</span>
                    </a>
                    <a href="#" class="flex items-center p-3 rounded-lg hover:bg-gray-700 mb-2">
                        <i class="fas fa-cog ml-3"></i>
                        <span>الإعدادات</span>
                    </a>
                </nav>
            </aside>

            <!-- Main Content -->
            <main class="flex-1 p-8">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-gray-800">لوحة التحكم</h1>
                    <p class="text-gray-600">مرحباً بك في منصة Boostly Glow Forge</p>
                </div>

                <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-blue-500 text-3xl">
                                <i class="fas fa-dollar-sign"></i>
                            </div>
                            <span class="text-green-500 text-sm">+12%</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800">285K</div>
                        <div class="text-gray-600">الإيرادات الشهرية</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-purple-500 text-3xl">
                                <i class="fas fa-bullhorn"></i>
                            </div>
                            <span class="text-green-500 text-sm">+5</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800">12</div>
                        <div class="text-gray-600">حملة نشطة</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-green-500 text-3xl">
                                <i class="fas fa-users"></i>
                            </div>
                            <span class="text-green-500 text-sm">+8</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800">45</div>
                        <div class="text-gray-600">عميل نشط</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <div class="flex items-center justify-between mb-2">
                            <div class="text-red-500 text-3xl">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <span class="text-green-500 text-sm">+23%</span>
                        </div>
                        <div class="text-2xl font-bold text-gray-800">5.96x</div>
                        <div class="text-gray-600">عائد الاستثمار</div>
                    </div>
                </div>

                <!-- Charts Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">أداء الحملات</h2>
                        <canvas id="campaignChart"></canvas>
                    </div>
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-xl font-bold text-gray-800 mb-4">توزيع الميزانية</h2>
                        <canvas id="budgetChart"></canvas>
                    </div>
                </div>

                <!-- Recent Activities -->
                <div class="bg-white rounded-xl shadow-lg p-6">
                    <h2 class="text-xl font-bold text-gray-800 mb-4">آخر النشاطات</h2>
                    <div class="space-y-4">
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="bg-green-100 text-green-600 p-2 rounded-lg ml-3">
                                    <i class="fas fa-check"></i>
                                </div>
                                <div>
                                    <div class="font-semibold">حملة رمضان 2024</div>
                                    <div class="text-sm text-gray-600">تم تحقيق الهدف بنسبة 120%</div>
                                </div>
                            </div>
                            <span class="text-sm text-gray-500">منذ ساعتين</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="bg-blue-100 text-blue-600 p-2 rounded-lg ml-3">
                                    <i class="fas fa-user-plus"></i>
                                </div>
                                <div>
                                    <div class="font-semibold">عميل جديد</div>
                                    <div class="text-sm text-gray-600">شركة الأمل للاستثمار</div>
                                </div>
                            </div>
                            <span class="text-sm text-gray-500">منذ 5 ساعات</span>
                        </div>
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center">
                                <div class="bg-purple-100 text-purple-600 p-2 rounded-lg ml-3">
                                    <i class="fas fa-rocket"></i>
                                </div>
                                <div>
                                    <div class="font-semibold">إطلاق حملة جديدة</div>
                                    <div class="text-sm text-gray-600">حملة الصيف المميز</div>
                                </div>
                            </div>
                            <span class="text-sm text-gray-500">أمس</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        <script>
            // Campaign Performance Chart
            const ctx1 = document.getElementById('campaignChart').getContext('2d');
            new Chart(ctx1, {
                type: 'bar',
                data: {
                    labels: ['رمضان', 'الصيف', 'العودة للمدارس', 'الجمعة البيضاء'],
                    datasets: [{
                        label: 'النقرات',
                        data: [45000, 28000, 35000, 0],
                        backgroundColor: 'rgba(147, 51, 234, 0.5)'
                    }]
                }
            });

            // Budget Distribution Chart
            const ctx2 = document.getElementById('budgetChart').getContext('2d');
            new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: ['Facebook', 'Instagram', 'Google Ads', 'TikTok'],
                    datasets: [{
                        data: [35, 25, 30, 10],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.8)',
                            'rgba(236, 72, 153, 0.8)',
                            'rgba(34, 197, 94, 0.8)',
                            'rgba(168, 85, 247, 0.8)'
                        ]
                    }]
                }
            });
        </script>
    </body>
    </html>
  `)
})

export default app