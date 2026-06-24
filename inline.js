
    const PRICING = window.PFM_PRICING || {};
    const RETAIL_PRICING = PRICING.retail || {};
    const ROUTE_PACKAGES = PRICING.routePackages || {};
    const SHOPPING_CENTRE_PRICING = PRICING.shoppingCentre || {};

    const OPERATING_UNIT_MAP = { "Shops": 7, "Shopping Centres": 8, "Streets": 9 };
    const CUSTOMER_TYPE_TO_OPERATING_UNIT = { "Retail Chain": "Shops", "Shopping Centre": "Shopping Centres" };
    const SALESPERSON_MAP = {
      "Christiaan van Rooijen": 231,
      "Anna Reilander": 394,
      "Arnoud Aschman": 343,
      "Bart Schmitz": 9,
      "David Sturdy": 4,
      "Krystof Gogela": 387,
      "Mark Gosnell": 335,
      "Mark King": 263,
      "Oliver Germer": 404,
      "Phill Cox": 122,
      "Prince Competence": 382,
      "Raymond Sestig": 328,
      "Samar Moussa": 399,
      "Tim Drayton": 97
    };
    const ODOO_TEMPLATE_MAP = {
      "Shops": { "Budget": "odoo_template_shops_budget", "Premium": "odoo_template_shops_premium" },
      "Shopping Centres": { "Budget": "odoo_template_shopping_centres_budget", "Premium": "odoo_template_shopping_centres_premium" },
      "Streets": { "Budget": "odoo_template_streets_budget", "Premium": "odoo_template_streets_premium" }
    };
    const OPPORTUNITY_MAP = { "Premium": 198, "Budget": 199 };

    const state = {
      step: 1,
      lang: "EN",
      customerType: "Retail Chain",
      selectedGoals: ["baseline_missing", "visitors_not_buying"],
      selectedPackage: "performance",
      opportunityType: "Premium",
      values: {
        clientName: "Nelson Schoenen",
        preparedBy: "Anna Reilander",
        segment: "Footwear Retail",
        locations: 50,
        weeklyFootfall: 8400,
        measurement: "Current traffic and sales data",
        centreType: "Covered centre",
        entrances: 4,
        centreSurface: 35000,
        storesPresent: 85,
        conversionRate: 18,
        avgTicket: 32,
        grossMargin: 60,
        footfallUplift: 0,
        conversionUplift: 0,
        atvUplift: 0,
        realisationFactor: 25,
        openDays: 6,
        tcoYears: 3,
        satShare: 18,
        satBoost: 0,
        entranceCapexStore: RETAIL_PRICING.entrancePerformance?.capexPerStore ?? 1500,
        entranceMonthlyStore: RETAIL_PRICING.entrancePerformance?.monthlyPerStore ?? 21,
        captureCapexStore: RETAIL_PRICING.captureRate?.capexPerStore ?? 500,
        captureMonthlyStore: RETAIL_PRICING.captureRate?.monthlyPerStore ?? 10,
        captureStores: RETAIL_PRICING.captureRate?.defaultScopeStores ?? 10,
        instoreCapexPerSqm: RETAIL_PRICING.instoreJourney?.capexPerSqm ?? 35,
        instoreMonthlySensor: RETAIL_PRICING.instoreJourney?.monthlyPerSensor ?? 125,
        instoreStores: RETAIL_PRICING.instoreJourney?.defaultPilotStores ?? 1,
        avgStoreSqm: RETAIL_PRICING.instoreJourney?.defaultAverageStoreSqm ?? 150,
        instoreSqmCoveragePerSensor: RETAIL_PRICING.instoreJourney?.sqmCoveragePerSensor ?? 75
      }
    };



    const REALISATION_MAP = {
      "Conservative": 10,
      "Cautious base": 15,
      "Realistic base": 25,
      "Strong adoption": 35,
      "Best case": 50
    };

    const journey = [
      { id: 1, icon: "🏁", label: "Context" },
      { id: 2, icon: "🎯", label: "Performance leaks" },
      { id: 3, icon: "💡", label: "Insight fit" },
      { id: 4, icon: "€", label: "Impact model" },
      { id: 5, icon: "🧭", label: "Route" },
      { id: 6, icon: "✓", label: "Summary" }
    ];

    const centreTypeOptions = {
      EN: ["Covered centre", "Open-air centre", "Partly covered centre"],
      DE: ["Überdachtes Center", "Offenes Center", "Teilweise überdachtes Center"],
      NL: ["Overdekt centrum", "Open centrum", "Deels overdekt centrum"],
      FR: ["Centre couvert", "Centre ouvert", "Centre partiellement couvert"],
      ES: ["Centro cubierto", "Centro abierto", "Centro parcialmente cubierto"]
    };

    const retailGoals = {
      baseline_missing: {
        icon: "🧱",
        title: "We do not have a trusted performance baseline",
        pain: "We know sales or transactions, but we do not know how many people actually entered, which makes store performance hard to judge.",
        outcome: "Create a reliable baseline for footfall, conversion and store potential across every location.",
        insightFit: "Trusted Footfall & Conversion Baseline",
        proof: "Seen in Wibra, PassaSports, Telenet and smaller retailers: existing counters are minimal, old, lazy or missing, while transaction data alone cannot explain opportunity.",
        hiddenKpis: ["footfall", "count_in", "count_out", "transactions", "conversion_rate", "data_quality", "sensor_uptime"],
        hiddenSubscriptions: ["sub_footfall_core", "sub_sensor_monitoring", "sub_data_quality", "sub_sales_conversion"],
        questions: ["Do you know how many visitors you need to create today’s sales?", "Is the data trusted enough to compare stores?", "Can store teams see the same truth as head office?"]
      },
      visitors_not_buying: {
        icon: "📈",
        title: "We have visitors, but not enough buyers",
        pain: "Traffic is visible, but the moment, store or reason for conversion leakage is still unclear.",
        outcome: "Identify which stores, days and hours have enough visitors but miss sales potential.",
        insightFit: "Conversion Leak Intelligence",
        proof: "Recurring pattern in sales calls: retailers want to connect footfall with transactions, conversion, ATV and sales per visitor instead of only counting people.",
        hiddenKpis: ["footfall", "transactions", "conversion_rate", "sales_per_visitor", "atv", "conversion_by_hour"],
        hiddenSubscriptions: ["sub_footfall_core", "sub_sales_conversion", "sub_performance_dashboard", "sub_hourly_conversion"],
        questions: ["Which stores have good traffic but weak sales?", "When does conversion drop?", "Can teams see what to improve next week?"]
      },
      street_vs_store: {
        icon: "🎯",
        title: "We do not know if the problem is the street or the store",
        pain: "When visits drop, teams debate whether the street is quieter or the store has lost attraction power.",
        outcome: "Separate external traffic decline from storefront attraction and calculate capture rate by day, week and campaign.",
        insightFit: "Capture Rate & Street Potential Intelligence",
        proof: "Mr Marvis, Essentials and LAGAAM all raised the need to compare passers-by with store visitors to understand attraction, window impact and real location potential.",
        hiddenKpis: ["passerby_traffic", "capture_rate", "footfall", "weather_context", "campaign_uplift", "street_trend"],
        hiddenSubscriptions: ["sub_passerby_measurement", "sub_capture_rate", "sub_external_context", "sub_marketing_insights"],
        questions: ["Are fewer people entering because the street is quieter?", "Is the window or facade pulling enough people in?", "Can marketing prove it increased store visits?"]
      },
      groups_distort_conversion: {
        icon: "👨‍👩‍👧",
        title: "Families and groups make conversion look worse than it is",
        pain: "A store can look underperforming when many visitors come in as families, friends or groups where only one person is likely to buy.",
        outcome: "Add buying-unit context so conversion discussions become fairer and more useful for store teams.",
        insightFit: "Buying Unit Conversion Context",
        proof: "This came up strongly in conversations around weekend traffic, families, tourists, school groups and group entry patterns.",
        hiddenKpis: ["individual_footfall", "buying_units", "group_size", "group_count", "adult_child_split", "family_share", "conversion_rate", "conversion_per_buying_unit"],
        hiddenSubscriptions: ["sub_buying_units", "sub_group_counting", "sub_adult_child", "sub_demographic_context", "sub_sales_conversion"],
        questions: ["Do weekend numbers punish stores with family traffic?", "Are you measuring people or real buying opportunities?", "Can store managers explain conversion with context?"]
      },
      visitor_profile_unknown: {
        icon: "🧬",
        title: "We do not know who is entering our stores",
        pain: "Footfall shows how many people enter, but not whether the visitor mix is changing by gender, adults, children, families, groups or later age categories.",
        outcome: "Activate visitor profile datasets so teams can understand who visits, when the mix changes and which stores attract the right audience.",
        insightFit: "Visitor Profile & Demographic Intelligence",
        proof: "Retail conversations increasingly move beyond count-in/count-out: customers ask for gender, kids versus adults, family/group context and later age categories to understand real buying potential and audience fit.",
        hiddenKpis: ["gender_split", "adult_child_split", "age_category_future", "group_count", "family_share", "visitor_profile_by_store", "visitor_profile_by_period"],
        hiddenSubscriptions: ["sub_demographics_gender", "sub_adult_child", "sub_age_future", "sub_group_counting", "sub_visitor_profile_dashboard"],
        questions: ["Do you know if the right audience is entering?", "Does the visitor mix differ by store, day or campaign?", "Are families and groups changing the real buying opportunity?"]
      },
      stores_hard_to_compare: {
        icon: "⚖️",
        title: "Stores are compared unfairly",
        pain: "City stores, destination stores, retail parks, tourist locations and flagships are often compared as if they operate under the same conditions.",
        outcome: "Create fair peer groups and reveal real underperformance, hidden potential and benchmark gaps.",
        insightFit: "Portfolio Benchmark Intelligence",
        proof: "Rituals and Mr Marvis both show the need to compare stores by type, context, traffic profile and location potential instead of raw totals alone.",
        hiddenKpis: ["store_type", "sqm", "footfall", "conversion_rate", "sales_per_visitor", "benchmark_index", "peer_group"],
        hiddenSubscriptions: ["sub_portfolio_dashboard", "sub_benchmarking", "sub_store_type_analysis", "sub_region_dashboard"],
        questions: ["Do you compare stores by type, size and context?", "Which locations deserve attention first?", "Can regional managers explain performance differences?"]
      },
      staffing_feels_reactive: {
        icon: "👥",
        title: "Staff planning and service moments are based too much on feeling",
        pain: "Busy moments are obvious afterwards, but service capacity should be planned before the commercial opportunity is missed.",
        outcome: "Match staffing, service focus and store routines to real visitor demand, peaks, dead hours and conversion gaps.",
        insightFit: "Store Operations & Service Intelligence",
        proof: "Multiple conversations link footfall to staffing, service levels, missed opportunity hours and whether employees have enough time to convert visitors.",
        hiddenKpis: ["hourly_footfall", "peak_hours", "dead_hours", "conversion_by_hour", "staff_interaction", "service_wait_time"],
        hiddenSubscriptions: ["sub_operations_insights", "sub_weekly_reporting", "sub_dead_hour_analysis", "sub_service_interaction"],
        questions: ["Which hours are busy but commercially weak?", "Are schedules based on real demand?", "Where can service levels improve without guessing?"]
      },
      entrance_bounce: {
        icon: "🚪",
        title: "People step in, hesitate and leave again",
        pain: "Some visitors cross the threshold, browse the entrance area, see friction such as stairs or layout, and leave before they become a real sales opportunity.",
        outcome: "Measure entrance engagement and bounce so teams know whether the first metres of the store create or lose potential.",
        insightFit: "Entrance Engagement & Bounce Intelligence",
        proof: "Essentials showed a very concrete leak: people enter, pause near the entrance, see the stairs or first display, and walk out again.",
        hiddenKpis: ["entrance_detection", "entry_bounce", "threshold_to_store_ratio", "front_zone_dwell", "first_zone_conversion"],
        hiddenSubscriptions: ["sub_entrance_engagement", "sub_zone_analytics", "sub_store_layout_insights"],
        questions: ["Do people actually enter the store or only the doorway?", "Where should the visitor become a counted opportunity?", "Does the first zone help or block conversion?"]
      },
      instore_unknown: {
        icon: "🧭",
        title: "We do not know what happens after people enter",
        pain: "The store may be busy, but teams cannot see where people go, what they skip, where they dwell or which category loses attention.",
        outcome: "Use zone, journey, heatmap and dwell insights to improve layout, category exposure and flagship learnings.",
        insightFit: "In-store Journey & Category Intelligence",
        proof: "George / D'HYÈRES wanted to compare gold versus silver sections; PassaSports asked about heatmapping and assortment; Telenet and Dreamland explored in-store analytics as a next stage.",
        hiddenKpis: ["zone_traffic", "dwell_time", "heatmap", "product_category_exposure", "route_flow", "interaction_time"],
        hiddenSubscriptions: ["sub_zone_analytics", "sub_journey_tracking", "sub_heatmap", "sub_category_performance"],
        questions: ["Which areas attract traffic but do not convert?", "Does layout or product category explain performance?", "Which flagship learnings should shape future stores?"]
      },
      expansion_gut_feel: {
        icon: "📍",
        title: "Expansion decisions still rely too much on gut feel",
        pain: "Retail teams often choose cities or streets because they feel right, without knowing if the audience, traffic and location potential match the brand.",
        outcome: "Support expansion, relocation and lease discussions with location potential, catchment and street-performance context.",
        insightFit: "Location Potential & Expansion Intelligence",
        proof: "Mr Marvis described expansion decisions using some data but also gut feeling and brand fit; the conversation moved directly to using data for future store decisions.",
        hiddenKpis: ["location_potential", "catchment_profile", "brand_affinity", "street_traffic", "capture_rate", "rent_vs_potential"],
        hiddenSubscriptions: ["sub_location_strategy", "sub_external_context", "sub_catchment_analysis", "sub_passerby_measurement"],
        questions: ["Is this street right for your customer profile?", "Do you know expected traffic before signing?", "Should you open, optimise or move?"]
      },
      data_not_activated: {
        icon: "🏆",
        title: "The data exists, but teams do not act on it enough",
        pain: "Dashboards alone do not change behaviour. Store and regional teams need simple action triggers, rhythm and motivation.",
        outcome: "Turn performance data into weekly action, store leagues, management focus and measurable improvement.",
        insightFit: "Retail Activation & Action Layer",
        proof: "Rituals discussed gamification, leagues and weekly sharing to increase engagement; Dreamland explicitly searched for a knowledge partner that helps them understand what to do with the data.",
        hiddenKpis: ["weekly_action_points", "store_ranking", "conversion_delta", "league_score", "opportunity_score", "priority_driver"],
        hiddenSubscriptions: ["sub_ai_recommendations", "sub_weekly_action_layer", "sub_gamification", "sub_customer_success"],
        questions: ["Do store teams know what to do next week?", "Can regional managers prioritise action?", "How do you keep performance improvement top of mind?"]
      }
    };


    const shoppingGoals = {
      centre_baseline: {
        icon: "🏛️",
        cluster: "Centre baseline",
        title: "We cannot prove how the centre is performing over time",
        pain: "The centre feels busy or quiet, but owners, tenants and investors need objective proof of traffic trends, peaks and benchmark context.",
        outcome: "Create a trusted centre baseline for visits, entrance contribution, peak moments and comparable performance over time.",
        insightFit: "Centre Performance Baseline",
        proof: "Seen in shopping centre conversations: owners need clear monthly/yearly traffic proof for tenants, investors, municipalities and internal stakeholders.",
        hiddenKpis: ["centre_footfall", "entrance_traffic", "centre_traffic_index", "peak_day", "peak_hour", "benchmark_index", "year_on_year_growth", "month_on_month_growth", "weather_context", "event_context"],
        hiddenSubscriptions: ["mod_entrance_counting", "mod_centre_dashboard", "mod_benchmark_reporting", "mod_data_validation_service"],
        questions: ["Can you prove whether the centre is growing or declining?", "Can you benchmark against similar centres?", "Do tenants trust the numbers?"],
        modules: ["Entrance Counting", "Centre Dashboard", "Benchmark Reporting"]
      },
      entrance_value: {
        icon: "🚪",
        cluster: "Centre baseline",
        title: "We do not know which entrances actually drive value",
        pain: "Total centre traffic is useful, but it does not explain which entrances, access points or floors are becoming stronger or weaker.",
        outcome: "Reveal the contribution, trend and anomalies of every entrance or access point.",
        insightFit: "Entrance Performance Intelligence",
        proof: "Shopping centre setups often require all public access routes to be sealed: main entrances, parking entrances, upper/lower levels and anchor entrances.",
        hiddenKpis: ["entrance_count", "entrance_share", "entrance_trend", "in_out_balance", "access_point_index", "entrance_anomaly"],
        hiddenSubscriptions: ["mod_3d_entrance_sensors", "mod_entrance_dashboard", "mod_data_quality_monitoring"],
        questions: ["Which entrance contributes most to centre visits?", "Did roadworks, parking or tenant changes shift traffic?", "Which access point underperforms?"],
        modules: ["3D Entrance Sensors", "Entrance Performance Dashboard"]
      },
      zone_flow: {
        icon: "🧭",
        cluster: "Flow & engagement",
        title: "Visitors enter the centre, but we do not know where they go",
        pain: "Entrance counts show how many people arrive, but not whether visitors reach floors, corridors, toilets, F&B zones, anchors or weaker areas.",
        outcome: "Understand zone traffic, corridor flows, floor distribution and facility usage across the centre.",
        insightFit: "Zone Flow Intelligence",
        proof: "Centre managers increasingly ask for zone, passage and floor data to explain why certain areas or upper levels attract less traffic.",
        hiddenKpis: ["zone_traffic", "floor_traffic", "corridor_flow", "facility_usage", "toilet_zone_traffic", "anchor_zone_traffic", "zone_share", "zone_conversion_proxy"],
        hiddenSubscriptions: ["mod_zone_counting", "mod_floor_flow_dashboard", "mod_facility_flow_analytics"],
        questions: ["Do visitors reach every floor?", "Which corridors are underused?", "Do facilities and anchors pull traffic?"],
        modules: ["Zone Counting", "Floor Flow Dashboard", "Facility Analytics"]
      },
      tenant_capture: {
        icon: "🛍️",
        cluster: "Tenant & leasing value",
        title: "We cannot prove tenant value or tenant capture",
        pain: "Centre traffic is visible, but it is unclear which tenants capture mall traffic and which units underperform despite strong flow.",
        outcome: "Show tenant visits, tenant capture, traffic in front of stores and category performance.",
        insightFit: "Tenant Capture Intelligence",
        proof: "For outlet and shopping centre portfolios, tenant capture ratio, gross/net capture and retailer-level performance are key leasing and asset management metrics.",
        hiddenKpis: ["tenant_traffic", "tenant_capture_rate", "gross_capture_rate", "net_capture_rate", "traffic_in_front_of_store", "tenant_visit_share", "category_capture", "top_tenant_performers", "bottom_tenant_performers"],
        hiddenSubscriptions: ["mod_tenant_counting", "mod_mall_to_tenant_capture", "mod_tenant_dashboard", "mod_category_benchmarking"],
        questions: ["Which tenants turn mall traffic into store visits?", "Where is traffic strong but tenant capture weak?", "Can leasing prove unit value?"],
        modules: ["Tenant Counting", "Capture Analytics", "Category Benchmarking"]
      },
      leasing_evidence: {
        icon: "📍",
        cluster: "Tenant & leasing value",
        title: "Leasing conversations are still based too much on opinion",
        pain: "When a unit is vacant or rent is challenged, leasing needs evidence about flow, unit position, brand fit and catchment potential.",
        outcome: "Create leasing evidence with unit heatmaps, flow scores, brand affinity and tenant-mix opportunities.",
        insightFit: "Leasing Evidence & Unit Value Intelligence",
        proof: "Retail park and centre owners want to show potential tenants why a specific unit, zone or boulevard position is attractive.",
        hiddenKpis: ["unit_flow_score", "zone_heatmap", "tenant_mix_gap", "brand_affinity", "leasing_potential", "category_gap", "unit_visibility_score"],
        hiddenSubscriptions: ["mod_smart_data", "mod_brand_affinity", "mod_leasing_battlecard", "mod_unit_heatmap_layer"],
        questions: ["Can we prove this unit has strong traffic?", "Which tenant category is missing?", "Which brands fit this catchment?"],
        modules: ["Smart Data", "Brand Affinity", "Leasing Battlecard"]
      },
      catchment_geo: {
        icon: "🗺️",
        cluster: "Catchment & marketing",
        title: "We do not know where visitors come from or how our catchment is changing",
        pain: "The centre needs better insight into visitor origin, postcode areas, competitor overlap, visit frequency and household profiles.",
        outcome: "Map catchment, visitor origin, cross-visitation and geo-marketing battlegrounds using geo-app data.",
        insightFit: "Catchment & Geo App Intelligence",
        proof: "Geo-app data can enrich sensor counts with catchment, postcode, competitor and visitor-profile insights; it is a data service, not extra counting hardware.",
        hiddenKpis: ["catchment_area", "visitor_origin", "postcode_penetration", "city_origin", "visit_frequency", "cross_visitation", "competitor_overlap", "household_profile", "income_profile", "geo_marketing_area"],
        hiddenSubscriptions: ["mod_geo_app_data", "mod_catchment_dashboard", "mod_competitor_battlecard", "mod_geo_marketing_insights"],
        questions: ["Where do visitors come from?", "Which competitors share our audience?", "Where should marketing focus?"],
        modules: ["Geo App Data", "Catchment Dashboard", "Competitor Battlecard"]
      },
      brand_affinity: {
        icon: "🏷️",
        cluster: "Tenant & leasing value",
        title: "We do not know which brands our visitors already love",
        pain: "Tenant mix decisions are harder when you cannot see which brands your visitors visit elsewhere or which categories are missing.",
        outcome: "Use brand affinity, category gaps and competitor pull to create a data-backed leasing target list.",
        insightFit: "Brand Affinity & Tenant Mix Intelligence",
        proof: "Brand affinity can help identify brands or categories that your catchment already visits elsewhere but that are missing in your asset.",
        hiddenKpis: ["brand_affinity", "brand_penetration", "missing_brand_opportunity", "category_affinity", "tenant_mix_score", "competitor_brand_pull", "leasing_target_score"],
        hiddenSubscriptions: ["mod_brand_affinity_data", "mod_tenant_mix_analysis", "mod_leasing_intelligence", "mod_smart_data_dashboard"],
        questions: ["Which brands have high affinity in our catchment?", "Which categories are missing?", "Can we support tenant acquisition with data?"],
        modules: ["Brand Affinity Data", "Tenant Mix Analysis", "Leasing Intelligence"]
      },
      parking_mobility: {
        icon: "🚗",
        cluster: "Parking & mobility",
        title: "We cannot explain parking pressure and mobility patterns",
        pain: "Parking feels busy, but teams cannot prove occupancy, dwell time, peak pressure or unused capacity.",
        outcome: "Measure car counts, vehicle dwell time, parking occupancy and mobility patterns across access points.",
        insightFit: "Parking & Mobility Intelligence",
        proof: "For retail parks and centres with parking access, ANPR and car counting can reveal visits, dwell time, occupancy and space utilisation.",
        hiddenKpis: ["car_count_in", "car_count_out", "parking_occupancy", "vehicle_dwell_time", "parking_peak_pressure", "parking_capacity_utilisation", "parking_space_potential", "mobility_index"],
        hiddenSubscriptions: ["mod_anpr_counting", "mod_car_park_dashboard", "mod_vehicle_dwell", "mod_mobility_layer"],
        questions: ["When is parking actually full?", "How long do cars stay?", "Is there unused capacity for EV, kiosks or other uses?"],
        modules: ["ANPR Counting", "Parking Occupancy", "Vehicle Dwell"]
      },
      anpr_origin: {
        icon: "🌍",
        cluster: "Parking & mobility",
        title: "We do not know enough about international visitors and car origin",
        pain: "Cross-border assets need to understand where cars come from and how visitor origin changes by period or campaign.",
        outcome: "Show vehicle country/region origin, international share and dwell time by visitor group where legally available.",
        insightFit: "ANPR Origin Intelligence",
        proof: "ANPR origin analytics is relevant for centres and retail parks with visitors from multiple countries or regions.",
        hiddenKpis: ["vehicle_origin_country", "vehicle_origin_region", "international_share", "vehicle_dwell_time", "cross_border_visitation", "car_origin_mix"],
        hiddenSubscriptions: ["mod_anpr_origin", "mod_vehicle_dwell_dashboard", "mod_cross_border_reporting"],
        questions: ["What share of cars comes from other countries?", "Which regions matter most?", "Does international traffic change over time?"],
        modules: ["ANPR Origin Analytics", "Cross-border Reporting"]
      },
      dwell_cross_shopping: {
        icon: "🔁",
        cluster: "Flow & engagement",
        title: "We cannot measure dwell time and cross-shopping properly",
        pain: "The centre needs to understand whether visitors stay longer, visit multiple tenants, pass through or return later.",
        outcome: "Estimate dwell time, shops per visit, cross-shopping and visit frequency using the right mix of sensors, smart data and feasibility review.",
        insightFit: "Dwell Time & Cross-Shopping Intelligence",
        proof: "Re-ID and cross-shopping can be valuable, but should be positioned as advanced and subject to feasibility, privacy and DPIA review.",
        hiddenKpis: ["dwell_time", "shops_per_visit", "cross_shopping_index", "repeat_visit_frequency", "visitor_engagement", "re_id_feasibility", "journey_depth"],
        hiddenSubscriptions: ["mod_reid_feasibility", "mod_dwell_time", "mod_cross_shopping", "mod_smart_data_frequency"],
        questions: ["Do visitors stay long enough?", "Do they visit multiple tenants?", "Is Re-ID feasible and privacy-safe for this asset?"],
        modules: ["Re-ID Feasibility", "Dwell Analytics", "Cross-Shopping Analysis"]
      },
      visitor_profile: {
        icon: "👨‍👩‍👧",
        cluster: "Flow & engagement",
        title: "We do not understand visitor demographics well enough",
        pain: "Visitor numbers are visible, but the mix of adults, children, families and gender patterns is not yet part of the asset story.",
        outcome: "Activate visitor profile datasets on suitable 3D sensors to understand adult/child split, gender and later age categories.",
        insightFit: "Visitor Profile Intelligence",
        proof: "3D sensor datasets can add gender and adult/child indicators at entrances; age can be considered later when reliable and appropriate.",
        hiddenKpis: ["gender_split", "adult_child_split", "family_share", "group_count", "visitor_profile_by_entrance", "demographic_trend", "age_category_future"],
        hiddenSubscriptions: ["mod_3d_sensor_demographics", "mod_visitor_profile_dashboard", "mod_family_group_analytics"],
        questions: ["Is the centre attracting families?", "Does visitor profile differ by entrance or event?", "Which demographics respond to campaigns?"],
        modules: ["3D Demographics Add-on", "Visitor Profile Dashboard"]
      },
      event_marketing: {
        icon: "📣",
        cluster: "Catchment & marketing",
        title: "We cannot connect events, marketing and offline visits",
        pain: "Events and campaigns cost money, but offline impact is often hard to prove in visitor traffic and catchment response.",
        outcome: "Measure event uplift, campaign response, social/online signals and offline visits in one view.",
        insightFit: "Event & Marketing Impact Intelligence",
        proof: "Centre teams need evidence that events, roadworks, campaigns or seasonal activations changed visits, not just impressions.",
        hiddenKpis: ["event_uplift", "campaign_traffic_uplift", "social_engagement", "offline_visit_response", "event_roi", "marketing_effect_index", "weather_adjusted_traffic"],
        hiddenSubscriptions: ["mod_event_monitor", "mod_marketing_impact", "mod_geo_campaign_analysis", "mod_weather_event_context"],
        questions: ["Did the event increase visits?", "Which areas responded to marketing?", "Can we prove offline impact?"],
        modules: ["Event Monitor", "Marketing Impact", "Geo Campaign Analysis"]
      },
      asset_health: {
        icon: "📊",
        cluster: "Portfolio control",
        title: "Portfolio and asset teams cannot compare centres fairly",
        pain: "Multiple centres and retail parks need one comparable view of asset health, trend, forecast and performance drivers.",
        outcome: "Create an asset health score or Location Vitality Index to compare centres over time and identify what drives performance.",
        insightFit: "Location Vitality Index / Asset Health Intelligence",
        proof: "For portfolios, an all-in-one index can combine footfall, dwell time, car park occupancy, catchment and other factors into one comparable asset score.",
        hiddenKpis: ["location_vitality_index", "asset_health_score", "portfolio_rank", "benchmark_score", "forecast_trend", "driver_breakdown", "footfall_benchmark", "dwell_time_score", "mobility_score", "catchment_score"],
        hiddenSubscriptions: ["mod_lvi_asset_health", "mod_portfolio_dashboard", "mod_forecasting", "mod_executive_reporting"],
        questions: ["Which centres are improving or declining?", "Which driver explains the score?", "Can asset teams compare apples-to-apples?"],
        modules: ["LVI / Asset Health Index", "Portfolio Dashboard", "Forecasting"]
      }
    };

    const packages = {
      starter: {
        name: "Essential",
        headline: "Measure the basics reliably",
        promise: "For retailers that first need a trusted baseline for store traffic and conversion potential.",
        contains: ["Advantage Portal", "Data management", "Footfall"],
        odooKey: "essential"
      },
      performance: {
        name: "Professional",
        headline: "Understand who visits and what attracts them",
        promise: "For retailers that want visitor profile insights, capture-rate context and richer performance explanation.",
        contains: ["Essential included", "Age / gender / group options", "Occupancy", "Capture rate"],
        odooKey: "professional"
      },
      intelligence: {
        name: "Enterprise",
        headline: "Analyse journeys, zones and in-store behaviour",
        promise: "For retailers that want in-store analytics, zoning, dwell, Re-ID feasibility or advanced reporting.",
        contains: ["Professional included", "Re-ID / dwell", "Heat mapping", "Sales-data conversion report"],
        odooKey: "enterprise"
      }
    };

    const labels = {
      EN: {
        next: "Next", back: "Back", startScan: "Start scan", comingSoon: "Shopping Centre flow comes next",
        company: "Company", preparedBy: "Prepared by", segment: "Segment", locations: "Locations", weeklyFootfall: "Footfall / week", measurement: "Current measurement",
        centreType: "Centre type", entrances: "Number of entrances", centreSurface: "Centre surface", storesPresent: "Number of stores"
      },
      NL: {
        next: "Verder", back: "Terug", startScan: "Start scan", comingSoon: "Shopping Centre flow komt hierna",
        company: "Bedrijf", preparedBy: "Voorbereid door", segment: "Segment", locations: "Aantal locaties", weeklyFootfall: "Footfall per week", measurement: "Huidige meting",
        centreType: "Type centrum", entrances: "Aantal entrees", centreSurface: "Oppervlakte centrum", storesPresent: "Aantal winkels"
      },
      DE: {
        next: "Weiter", back: "Zurück", startScan: "Scan starten", comingSoon: "Shopping-Center-Flow folgt danach",
        company: "Unternehmen", preparedBy: "Vorbereitet von", segment: "Segment", locations: "Standorte", weeklyFootfall: "Besucherfrequenz / Woche", measurement: "Aktuelle Messung",
        centreType: "Center-Typ", entrances: "Anzahl Eingänge", centreSurface: "Center-Fläche", storesPresent: "Anzahl Stores"
      },
      FR: {
        next: "Suivant", back: "Retour", startScan: "Démarrer", comingSoon: "Le flow Shopping Centre vient ensuite",
        company: "Entreprise", preparedBy: "Préparé par", segment: "Segment", locations: "Nombre de sites", weeklyFootfall: "Fréquentation / semaine", measurement: "Mesure actuelle",
        centreType: "Type de centre", entrances: "Nombre d'entrées", centreSurface: "Surface du centre", storesPresent: "Nombre de magasins"
      },
      ES: {
        next: "Siguiente", back: "Atrás", startScan: "Iniciar scan", comingSoon: "El flujo Shopping Centre viene después",
        company: "Empresa", preparedBy: "Preparado por", segment: "Segmento", locations: "Ubicaciones", weeklyFootfall: "Afluencia / semana", measurement: "Medición actual",
        centreType: "Tipo de centro", entrances: "Número de entradas", centreSurface: "Superficie del centro", storesPresent: "Número de tiendas"
      }
    };

    function L(key) { return (labels[state.lang] || labels.EN)[key] || key; }
    function euro(n) { return "€" + Math.round(n).toLocaleString("de-DE"); }
    function pct(n, digits = 1) { return Number(n).toFixed(digits).replace(".", ",") + "%"; }
    function operatingUnit() { return CUSTOMER_TYPE_TO_OPERATING_UNIT[state.customerType] || "Shops"; }
    function salespersonId() { return SALESPERSON_MAP[state.values.preparedBy] || null; }
    function unitCount() { return state.customerType === "Retail Chain" ? Number(state.values.locations || 1) : Number(state.values.entrances || 1); }

    function recommendedPackageKey() {
      if (state.customerType === "Shopping Centre") {
        return state.selectedPackage || "performance";
      }
      if (hasInstoreFit()) return "intelligence";
      if (hasCaptureFit() || hasDemographicFit()) return "performance";
      return "starter";
    }

    function syncRecommendedPackage() {
      state.selectedPackage = recommendedPackageKey();
    }

    function routeLabel() {
      if (state.customerType === "Shopping Centre") {
        return { starter: "Foundation", performance: "Asset Intelligence", intelligence: "Portfolio Intelligence" }[state.selectedPackage] || "Asset Intelligence";
      }
      return packages[recommendedPackageKey()]?.name || "Essential";
    }

    function routeReason() {
      if (state.customerType !== "Retail Chain") return "Based on the selected asset intelligence needs.";
      if (hasInstoreFit()) return "In-store analytics, zoning or journey insights require the Enterprise route.";
      if (hasCaptureFit()) return "Capture-rate or street-potential insight moves the scope to Professional.";
      if (hasDemographicFit()) return "Visitor profile insights such as age, gender, groups or adults/kids move the scope to Professional.";
      return "The selected scope focuses on trusted footfall and conversion baseline: Essential.";
    }

    function goalsCatalog() {
      return state.customerType === "Shopping Centre" ? shoppingGoals : retailGoals;
    }

    function selectedGoalObjects() {
      const catalog = goalsCatalog();
      return state.selectedGoals.map(id => catalog[id]).filter(Boolean);
    }

    function hiddenKpis() {
      return [...new Set(selectedGoalObjects().flatMap(g => g.hiddenKpis))];
    }

    function hiddenSubscriptions() {
      return [...new Set(selectedGoalObjects().flatMap(g => g.hiddenSubscriptions))];
    }

    function hasCaptureFit() {
      const kpis = hiddenKpis();
      return state.selectedGoals.includes("street_vs_store") || state.selectedGoals.includes("expansion_gut_feel") || kpis.includes("capture_rate") || kpis.includes("passerby_traffic") || kpis.includes("street_traffic");
    }

    function hasInstoreFit() {
      const kpis = hiddenKpis();
      return state.selectedGoals.includes("instore_unknown") || state.selectedGoals.includes("entrance_bounce") || kpis.includes("zone_traffic") || kpis.includes("dwell_time") || kpis.includes("heatmap") || kpis.includes("route_flow") || kpis.includes("interaction_time") || kpis.includes("staff_interaction");
    }

    function demographicAddonPricing() {
      return RETAIL_PRICING.demographics || {};
    }

    function activeDemographicAddons() {
      const kpis = hiddenKpis();
      const pricing = demographicAddonPricing();
      const addons = [];
      if (kpis.includes("gender_split")) addons.push({ key: "gender", label: "Gender stats", monthly: Number(pricing.genderMonthlyPerSensor ?? 5) });
      if (kpis.includes("adult_child_split")) addons.push({ key: "adult_child", label: "Adults / kids", monthly: Number(pricing.adultChildMonthlyPerSensor ?? 5) });
      if (kpis.includes("group_count") || kpis.includes("group_size") || kpis.includes("buying_units")) addons.push({ key: "group_counting", label: "Group counting", monthly: Number(pricing.groupMonthlyPerSensor ?? 5) });
      if (kpis.includes("age_category_future")) addons.push({ key: "age_future", label: "Age category future", monthly: Number(pricing.ageMonthlyPerSensorFuture ?? 5) });
      const seen = new Set();
      return addons.filter(a => {
        if (seen.has(a.key)) return false;
        seen.add(a.key);
        return true;
      });
    }

    function hasDemographicFit() {
      return activeDemographicAddons().length > 0 || state.selectedGoals.includes("visitor_profile_unknown") || state.selectedGoals.includes("groups_distort_conversion");
    }

    function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

    function solutionComponents() {
      const stores = Number(state.values.locations || 0);
      const years = Number(state.values.tcoYears || 1);
      const captureActive = hasCaptureFit();
      const instoreActive = hasInstoreFit();
      const rawCaptureStores = state.values.captureStores ?? Math.min(10, stores);
      const captureStores = captureActive ? clamp(Number(rawCaptureStores), 0, stores || 0) : 0;
      const instoreStores = instoreActive ? clamp(Number(state.values.instoreStores || 1), 1, stores || 1) : 0;
      const avgSqm = Number(state.values.avgStoreSqm || 0);
      const sqmCoverage = Number(state.values.instoreSqmCoveragePerSensor || 75);
      const sensorsPerInstoreStore = instoreActive ? Math.max(1, Math.ceil(avgSqm / sqmCoverage)) : 0;
      const instoreSensorUnits = instoreStores * sensorsPerInstoreStore;
      const demographicAddons = activeDemographicAddons();
      const demographicActive = hasDemographicFit();
      const demographicUnits = demographicActive ? stores : 0;
      const demographicMonthlyPerUnit = demographicAddons.reduce((sum, a) => sum + Number(a.monthly || 0), 0);
      const demographicLabels = demographicAddons.map(a => a.label).join(", ");

      const components = [
        {
          component_key: "entrance_performance",
          component_label: "Entrance Performance Layer",
          active: true,
          scope_type: "all_stores",
          stores_in_scope: stores,
          units: stores,
          unit_label: "stores",
          capex_model: "per_store",
          capex_per_unit: Number(state.values.entranceCapexStore || 0),
          monthly_fee_per_unit: Number(state.values.entranceMonthlyStore || 0),
          capex_total: stores * Number(state.values.entranceCapexStore || 0),
          monthly_fee_total: stores * Number(state.values.entranceMonthlyStore || 0),
          tco_total: stores * Number(state.values.entranceCapexStore || 0) + stores * Number(state.values.entranceMonthlyStore || 0) * 12 * years,
          quote_note: "Premium entrance performance layer."
        },
        {
          component_key: "capture_rate",
          component_label: "Street Potential / Capture Rate Layer",
          active: captureActive,
          scope_type: captureActive ? "pilot_or_selected_stores" : "not_selected",
          stores_in_scope: captureStores,
          units: captureStores,
          unit_label: "stores",
          capex_model: "per_store",
          capex_per_unit: Number(state.values.captureCapexStore || 0),
          monthly_fee_per_unit: Number(state.values.captureMonthlyStore || 0),
          capex_total: captureStores * Number(state.values.captureCapexStore || 0),
          monthly_fee_total: captureStores * Number(state.values.captureMonthlyStore || 0),
          tco_total: captureStores * Number(state.values.captureCapexStore || 0) + captureStores * Number(state.values.captureMonthlyStore || 0) * 12 * years,
          quote_note: "Adds passer-by / street traffic measurement for capture-rate insight."
        },
        {
          component_key: "instore_journey",
          component_label: "In-store Journey Layer",
          active: instoreActive,
          scope_type: instoreActive ? "pilot_or_flagship_stores" : "not_selected",
          stores_in_scope: instoreStores,
          average_store_sqm: avgSqm,
          sqm_coverage_per_sensor: sqmCoverage,
          sensors_per_store: sensorsPerInstoreStore,
          units: instoreSensorUnits,
          unit_label: "sensors",
          capex_model: "per_sqm",
          capex_per_sqm: Number(state.values.instoreCapexPerSqm || 0),
          monthly_fee_per_unit: Number(state.values.instoreMonthlySensor || 0),
          capex_total: instoreStores * avgSqm * Number(state.values.instoreCapexPerSqm || 0),
          monthly_fee_total: instoreSensorUnits * Number(state.values.instoreMonthlySensor || 0),
          tco_total: instoreStores * avgSqm * Number(state.values.instoreCapexPerSqm || 0) + instoreSensorUnits * Number(state.values.instoreMonthlySensor || 0) * 12 * years,
          quote_note: "Indicative in-store analytics scope for zone, journey and layout insights."
        },
        {
          component_key: "visitor_profile_addons",
          component_label: "Visitor Profile Dataset Add-ons",
          active: demographicActive,
          scope_type: demographicActive ? "activated_entrance_sensors" : "not_selected",
          stores_in_scope: demographicUnits,
          units: demographicUnits,
          unit_label: "activated sensors",
          capex_model: "license_addon",
          capex_per_unit: 0,
          monthly_fee_per_unit: demographicMonthlyPerUnit,
          capex_total: 0,
          monthly_fee_total: demographicUnits * demographicMonthlyPerUnit,
          tco_total: demographicUnits * demographicMonthlyPerUnit * 12 * years,
          quote_note: demographicLabels ? `Activated datasets: ${demographicLabels}. Indicative add-on pricing included.` : "Activated visitor profile datasets. Indicative add-on pricing included."
        }
      ];
      return components;
    }

    function activeComponents() { return solutionComponents().filter(c => c.active); }

    function commercialTotals() {
      const components = activeComponents();
      const capexTotal = components.reduce((sum,c) => sum + Number(c.capex_total || 0), 0);
      const monthlyServiceTotal = components.reduce((sum,c) => sum + Number(c.monthly_fee_total || 0), 0);
      const tcoTotal = components.reduce((sum,c) => sum + Number(c.tco_total || 0), 0);
      const totalHardwareUnits = components.reduce((sum,c) => sum + Number(c.units || 0), 0);
      return { capexTotal, monthlyServiceTotal, tcoTotal, totalHardwareUnits };
    }

    function calc() {
      // This mirrors the current Streamlit ROI calculator logic, with component-based TCO.
      const stores = Number(state.values.locations || 0);
      const weekly = Number(state.values.weeklyFootfall || 0);
      const openDays = Number(state.values.openDays || 6);
      const visitorsDay = openDays > 0 ? weekly / openDays : 0;
      const conv = Number(state.values.conversionRate || 0) / 100;
      const atv = Number(state.values.avgTicket || 0);
      const margin = Number(state.values.grossMargin || 0) / 100;
      const footfallUplift = Number(state.values.footfallUplift || 0) / 100;
      const conversionUplift = Number(state.values.conversionUplift || 0) / 100;
      const atvUplift = Number(state.values.atvUplift || 0) / 100;
      const satShare = Number(state.values.satShare || 0) / 100;
      const satBoost = Number(state.values.satBoost || 0) / 100;
      const tcoYears = Number(state.values.tcoYears || 1);
      const realisation = Number(state.values.realisationFactor || 0) / 100;

      const visitorsDayNew = visitorsDay * (1 + footfallUplift);
      const convNew = Math.min(1, conv + conversionUplift);
      const atvNew = atv * (1 + atvUplift);

      const visitorsYearStore = visitorsDay * openDays * 52;
      const visitorsYearStoreNew = visitorsDayNew * openDays * 52;
      const turnoverYearStore = visitorsYearStore * conv * atv;

      const nonSatVisitorsNew = visitorsYearStoreNew * (1 - satShare);
      const satVisitorsNew = visitorsYearStoreNew * satShare;
      const turnoverYearStoreNew = (nonSatVisitorsNew * convNew * atvNew) + (satVisitorsNew * convNew * (1 + satBoost) * atvNew);

      const upliftYearStore = Math.max(0, turnoverYearStoreNew - turnoverYearStore);
      const extraProfitYearStore = upliftYearStore * margin;

      const baselineRevenue = turnoverYearStore * stores;
      const revenueYearTotalNew = turnoverYearStoreNew * stores;
      const theoreticalUplift = upliftYearStore * stores;
      const theoreticalProfit = extraProfitYearStore * stores;
      const upliftContractTotal = theoreticalUplift * tcoYears;
      const theoreticalProfitContract = theoreticalProfit * tcoYears;
      const realisticProfit = theoreticalProfit * realisation;
      const realisticProfitContract = theoreticalProfitContract * realisation;

      const totals = commercialTotals();
      const tco = totals.tcoTotal;
      const monthlyServiceTotal = totals.monthlyServiceTotal;
      const capexTotal = totals.capexTotal;
      const netValue = realisticProfitContract - tco;
      const roi = tco > 0 ? (netValue / tco) * 100 : 0;
      const realisticExtraProfitMonthAfterSubscription = (realisticProfit / 12) - monthlyServiceTotal;
      const paybackMonths = realisticExtraProfitMonthAfterSubscription > 0 ? capexTotal / realisticExtraProfitMonthAfterSubscription : 0;

      const convOnlyTurnoverYearStore = (nonSatVisitorsNew * convNew * atv) + (satVisitorsNew * convNew * (1 + satBoost) * atv);
      const footfallOnlyTurnoverYearStore = visitorsYearStoreNew * conv * atv;
      const atvOnlyTurnoverYearStore = visitorsYearStore * conv * atvNew;
      const convComponent = Math.max(0, convOnlyTurnoverYearStore - turnoverYearStore) * stores;
      const footfallComponent = Math.max(0, footfallOnlyTurnoverYearStore - turnoverYearStore) * stores;
      const atvComponent = Math.max(0, atvOnlyTurnoverYearStore - turnoverYearStore) * stores;

      return {
        baselineRevenue,
        revenueYearTotalNew,
        theoreticalUplift,
        theoreticalProfit,
        realisticProfit,
        upliftContractTotal,
        theoreticalProfitContract,
        realisticProfitContract,
        tco,
        capexTotal,
        monthlyServiceTotal,
        netValue,
        paybackMonths,
        roi,
        visitorsDay,
        visitorsYearStore,
        visitorsYearStoreNew,
        convNew,
        atvNew,
        footfallComponent,
        convComponent,
        atvComponent
      };
    }

    function payload() {
      const c = calc();
      const ou = operatingUnit();
      const components = solutionComponents();
      const active = activeComponents();
      const totals = commercialTotals();
      const templateId = OPPORTUNITY_MAP[state.opportunityType] || null;
      const context = state.customerType === "Retail Chain"
        ? {
            segment: state.values.segment,
            locations: Number(state.values.locations),
            weekly_footfall_per_store: Number(state.values.weeklyFootfall),
            daily_footfall_per_store: Math.round(Number(state.values.weeklyFootfall) / Number(state.values.openDays || 6)),
            current_measurement: state.values.measurement
          }
        : {
            centre_type: state.values.centreType,
            entrances: Number(state.values.entrances),
            centre_surface_sqm: Number(state.values.centreSurface),
            stores_present: Number(state.values.storesPresent)
          };

      const roiRows = [
        { Metric: "Stores", Value: Number(state.values.locations), Context: "Retail chain input" },
        { Metric: "Daily footfall", Value: Math.round(Number(state.values.weeklyFootfall) / Number(state.values.openDays || 6)), Context: "Per store, derived from weekly footfall / open days" },
        { Metric: "Weekly footfall", Value: Number(state.values.weeklyFootfall), Context: "Per store" },
        { Metric: "Conversion rate", Value: pct(state.values.conversionRate), Context: "Baseline input" },
        { Metric: "ATV", Value: euro(state.values.avgTicket), Context: "Average ticket value" },
        { Metric: "Gross margin", Value: pct(state.values.grossMargin, 0), Context: "Input" },
        { Metric: "Open days per week", Value: Number(state.values.openDays), Context: "ROI calculator logic" },
        { Metric: "Contract term", Value: Number(state.values.tcoYears) + " years", Context: "TCO horizon" },
        { Metric: "Footfall uplift", Value: pct(state.values.footfallUplift), Context: "What-if input" },
        { Metric: "Conversion uplift", Value: pct(state.values.conversionUplift), Context: "What-if input" },
        { Metric: "ATV uplift", Value: pct(state.values.atvUplift), Context: "What-if input" },
        { Metric: "Saturday share", Value: pct(state.values.satShare), Context: "Optional Saturday scenario" },
        { Metric: "Saturday boost", Value: pct(state.values.satBoost), Context: "Optional Saturday scenario" },
        { Metric: "Realisation factor", Value: pct(state.values.realisationFactor, 0), Context: "Share of theoretical uplift captured" },
        { Metric: "Revenue / year", Value: euro(c.baselineRevenue), Context: "Baseline for selected stores" },
        { Metric: "Theoretical uplift / year", Value: euro(c.theoreticalUplift), Context: "Maximum scenario versus baseline" },
        { Metric: "Theoretical extra profit / year", Value: euro(c.theoreticalProfit), Context: "Before realisation factor" },
        { Metric: "Realistic extra profit / year", Value: euro(c.realisticProfit), Context: "After realisation factor" },
        { Metric: "Total CAPEX", Value: euro(c.capexTotal), Context: "All active solution components" },
        { Metric: "Monthly service total", Value: euro(c.monthlyServiceTotal), Context: "All active solution components" },
        { Metric: "Total cost of ownership", Value: euro(c.tco), Context: Number(state.values.tcoYears) + "-year contract horizon" },
        { Metric: "Realistic payback time", Value: c.paybackMonths ? c.paybackMonths.toFixed(1) + " months" : "n/a", Context: "Based on captured profit after subscription" },
        { Metric: "Realistic ROI over horizon", Value: pct(c.roi), Context: "Net value: " + euro(c.netValue) }
      ];

      return {
        source: "pfm_retail_potential_scan_v20",
        submitted_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        language: state.lang,
        num_stores: Number(state.values.locations),
        amount_of_sensors: Number(state.values.locations),
        total_hardware_units: totals.totalHardwareUnits,
        stores_in_scope: Number(state.values.locations),
        template_id: templateId,
        operating_unit_id: OPERATING_UNIT_MAP[ou],
        user_id: salespersonId(),
        customer_visible: {
          client_name: state.values.clientName,
          customer_type: state.customerType,
          operating_unit: ou,
          prepared_by: state.values.preparedBy,
          context,
          selected_goals: selectedGoalObjects().map(g => g.title),
          selected_insight_fits: [...new Set(selectedGoalObjects().map(g => g.insightFit))],
          selected_package: routeLabel(),
          active_solution_components: active.map(c => c.component_label),
          estimated_baseline_revenue_year: Math.round(c.baselineRevenue),
          realistic_extra_profit_year: Math.round(c.realisticProfit),
          tco_total: Math.round(c.tco),
          realistic_payback_months: c.paybackMonths || null
        },
        lead: {
          company_name: state.values.clientName,
          contact_name: null,
          contact_email: null,
          contact_phone: null,
          operating_unit_label: ou,
          salesperson_name: state.values.preparedBy,
          opportunity_type_label: state.opportunityType,
          template_id: templateId,
          operating_unit_id: OPERATING_UNIT_MAP[ou],
          user_id: salespersonId()
        },
        scenario: {
          currency: "EUR",
          num_stores: Number(state.values.locations),
          daily_footfall_per_store: c.visitorsDay,
          weekly_footfall_per_store: Number(state.values.weeklyFootfall),
          conversion_rate_pct: Number(state.values.conversionRate),
          average_ticket_value: Number(state.values.avgTicket),
          gross_margin_pct: Number(state.values.grossMargin),
          annual_footfall_per_store: c.visitorsYearStore,
          annual_footfall_total: c.visitorsYearStore * Number(state.values.locations),
          conversion_uplift_pp: Number(state.values.conversionUplift),
          new_conversion_rate_pct: c.convNew * 100,
          new_atv: c.atvNew,
          atv_uplift_pct: Number(state.values.atvUplift),
          footfall_uplift_pct: Number(state.values.footfallUplift),
          open_days_per_week: Number(state.values.openDays),
          contract_term_years: Number(state.values.tcoYears),
          roi_approach: Object.entries(REALISATION_MAP).find(([_, value]) => Number(value) === Number(state.values.realisationFactor))?.[0] || "Custom",
          realisation_factor_pct: Number(state.values.realisationFactor),
          optional_saturday_scenario: {
            sat_share_pct: Number(state.values.satShare),
            sat_conversion_boost_pct: Number(state.values.satBoost)
          },
          commercial_assumptions: {
            install_cost_per_store: Number(state.values.entranceCapexStore),
            monthly_subscription_per_store: Number(state.values.entranceMonthlyStore),
            tco_per_store: Number(state.values.entranceCapexStore) + Number(state.values.entranceMonthlyStore) * 12 * Number(state.values.tcoYears),
            tco_total: c.tco,
            component_based_tco: true,
            total_capex: c.capexTotal,
            monthly_service_total: c.monthlyServiceTotal
          },
          solution_components: components
        },
        results: {
          revenue_year_total: c.baselineRevenue,
          revenue_year_total_new: c.revenueYearTotalNew,
          uplift_year_total: c.theoreticalUplift,
          uplift_contract_total: c.upliftContractTotal,
          theoretical_extra_profit_year_total: c.theoreticalProfit,
          theoretical_extra_profit_contract_total: c.theoreticalProfitContract,
          realistic_extra_profit_year_total: c.realisticProfit,
          realistic_extra_profit_contract_total: c.realisticProfitContract,
          tco_total: c.tco,
          total_capex: c.capexTotal,
          monthly_service_total: c.monthlyServiceTotal,
          theoretical_net_value_horizon: c.theoreticalProfitContract - c.tco,
          theoretical_roi_horizon_pct: c.tco > 0 ? ((c.theoreticalProfitContract - c.tco) / c.tco) * 100 : 0,
          realistic_net_value_horizon: c.netValue,
          realistic_roi_horizon_pct: c.roi,
          theoretical_payback_months: null,
          realistic_payback_months: c.paybackMonths || null,
          uplift_components: {
            footfall_component: c.footfallComponent,
            conversion_component: c.convComponent,
            atv_component: c.atvComponent
          }
        },
        pfm_internal: {
          operating_unit_name: ou,
          operating_unit_id: OPERATING_UNIT_MAP[ou],
          salesperson_name: state.values.preparedBy,
          salesperson_id: salespersonId(),
          opportunity_type: state.opportunityType,
          template_id: templateId,
          customer_context: context,
          selected_performance_leaks: selectedGoalObjects().map(g => g.title),
          selected_insight_fits: [...new Set(selectedGoalObjects().map(g => g.insightFit))],
          hidden_kpis: hiddenKpis(),
          hidden_subscriptions: hiddenSubscriptions(),
          recommended_route: routeLabel(),
          odoo_template: ODOO_TEMPLATE_MAP[ou][state.opportunityType],
          suggested_odoo_action: "create_lead_or_indicative_proposal",
          human_review_required: true,
          solution_components: components,
          active_solution_components: active,
          roi_output_rows: roiRows
        }
      };
    }

    function populateSalespeople() {
      const select = document.getElementById("preparedBy");
      select.innerHTML = Object.keys(SALESPERSON_MAP).map(name => `<option>${name}</option>`).join("");
      select.value = state.values.preparedBy;
    }

    function renderNav() {
      const nav = document.getElementById("journeyNav");
      nav.innerHTML = journey.map(j => `
        <button class="journey-step ${j.id === state.step ? "active" : ""}" onclick="go(${j.id})">
          <span>${j.icon}</span><span>${j.label}</span>
        </button>
      `).join("");
      document.getElementById("nextBtn").textContent = L("next");
      document.getElementById("backBtn").disabled = state.step === 1;
      document.getElementById("nextBtn").disabled = state.step === 6;
      document.querySelectorAll(".lang-btn").forEach(btn => btn.classList.toggle("active", btn.dataset.lang === state.lang));
    }

    function renderContextFields() {
      const el = document.getElementById("contextFields");
      if (state.customerType === "Retail Chain") {
        el.innerHTML = `
          <div class="form-grid">
            <div><label>${L("segment")}</label><select id="segment"><option>Fashion Retail</option><option>Food & Beverage</option><option>Sport & Outdoor</option><option>Electronics</option></select></div>
            <div><label>${L("locations")}</label><input id="locations" type="number" min="1" value="${state.values.locations}"></div>
            <div><label>${L("weeklyFootfall")}</label><input id="weeklyFootfall" type="number" min="0" value="${state.values.weeklyFootfall}"></div>
            <div><label>${L("measurement")}</label><select id="measurement"><option>Basic counter</option><option>None / manual</option><option>Dashboard</option><option>Footfall + sales</option></select></div>
          </div>`;
        document.getElementById("segment").value = state.values.segment;
        document.getElementById("measurement").value = state.values.measurement;
      } else {
        const options = centreTypeOptions[state.lang].map(o => `<option>${o}</option>`).join("");
        if (!centreTypeOptions[state.lang].includes(state.values.centreType)) state.values.centreType = centreTypeOptions[state.lang][0];
        el.innerHTML = `
          <div class="form-grid">
            <div><label>${L("centreType")}</label><select id="centreType">${options}</select></div>
            <div><label>${L("entrances")}</label><input id="entrances" type="number" min="1" value="${state.values.entrances}"></div>
            <div><label>${L("centreSurface")} (m²)</label><input id="centreSurface" type="number" min="0" value="${state.values.centreSurface}"></div>
            <div><label>${L("storesPresent")}</label><input id="storesPresent" type="number" min="0" value="${state.values.storesPresent}"></div>
          </div>`;
        document.getElementById("centreType").value = state.values.centreType;
      }
      ["segment","locations","weeklyFootfall","measurement","centreType","entrances","centreSurface","storesPresent"].forEach(id => {
        const field = document.getElementById(id);
        if (!field) return;
        field.addEventListener("input", () => { readInputs(); renderAll(false); });
        field.addEventListener("change", () => { readInputs(); renderAll(false); });
      });
    }

    function readInputs() {
      const map = {
        clientName: "clientName", preparedBy: "preparedBy", segment: "segment", locations: "locations", weeklyFootfall: "weeklyFootfall",
        measurement: "measurement", centreType: "centreType", entrances: "entrances", centreSurface: "centreSurface", storesPresent: "storesPresent"
      };
      Object.entries(map).forEach(([key, id]) => {
        const el = document.getElementById(id);
        if (!el) return;
        state.values[key] = el.type === "number" ? Number(el.value || 0) : el.value;
      });
      const opp = document.getElementById("opportunityType");
      if (opp) state.opportunityType = opp.value;
    }

    function renderSummary() {
      const c = calc();
      const goals = selectedGoalObjects();
      const summary = document.createElement("aside");
      summary.className = "summary-card";
      summary.innerHTML = `
        <div class="kicker">Live scan summary</div>
        <h3>${state.values.clientName || "Company"}</h3>
        <p class="muted">${state.customerType} performance scan</p>
        <div style="margin:18px 0;">
          ${goals.map(g => `<span class="summary-pill">${g.icon} ${g.title.split(",")[0]}</span>`).join("") || `<span class="summary-pill">No goals selected</span>`}
        </div>
        ${state.customerType === "Retail Chain" ? `
          <div class="summary-row"><span>Locations</span><strong>${state.values.locations}</strong></div>
          <div class="summary-row"><span>Weekly footfall</span><strong id="summaryWeeklyFootfall">${Number(state.values.weeklyFootfall || 0).toLocaleString("de-DE")}</strong></div>
          <div class="summary-row"><span>PFM route</span><strong>${routeLabel()}</strong></div>
          <div class="summary-row"><span>Realistic profit</span><strong id="summaryRealisticProfit">${euro(c.realisticProfit)}</strong></div>
        ` : `
          <div class="summary-row"><span>Entrances</span><strong>${state.values.entrances}</strong></div>
          <div class="summary-row"><span>Stores</span><strong>${state.values.storesPresent}</strong></div>
          <div class="summary-row"><span>Surface</span><strong>${Number(state.values.centreSurface || 0).toLocaleString("de-DE")} m²</strong></div>
          <div class="summary-row"><span>Data modules</span><strong>${hiddenSubscriptions().length}</strong></div>
        `}
      `;
      return summary.outerHTML;
    }

    function shoppingPlaceholder() {
      return `
        <div class="shopping-placeholder">
          <div class="content-card">
            <div class="kicker">${L("comingSoon")}</div>
            <h2>Shopping Centre flow will be designed after Retail Chain is locked.</h2>
            <p class="muted">The first screen already captures shopping centre context and stores it for n8n/Odoo. The next pages will get a dedicated journey for entrances, tenant value, visitor flow and asset performance.</p>
            <div class="notice" style="margin-top:20px;">For now we focus on Retail Chain content, tools and business-case logic first. Once that flow is strong, we will build the Shopping Centre version with its own questions and outputs.</div>
          </div>
        </div>`;
    }

    function renderStep2() {
      const target = document.getElementById("screen2Content");
      const catalog = goalsCatalog();
      const isShopping = state.customerType === "Shopping Centre";
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">${isShopping ? "Shopping centre diagnosis" : "Retail diagnosis"}</div>
          <h2>${isShopping ? "Where does asset value" : "Where does performance"} <span class="highlight">leak</span> today?</h2>
          <p class="muted">${isShopping ? "Choose the asset, leasing, flow, parking, catchment and portfolio challenges that are most relevant for your organisation." : "Select the situations that are most recognisable for your stores. PFM will translate them into relevant performance insights and next steps."}</p>
          <div class="goal-grid">
            ${Object.entries(catalog).map(([id, g]) => `
              <div class="pain-card ${state.selectedGoals.includes(id) ? "active" : ""}" onclick="toggleGoal('${id}')">
                <div>
                  <div class="pain-icon">${g.icon}</div>
                  ${g.cluster ? `<span class="tag" style="margin-bottom:10px;">${g.cluster}</span>` : ""}
                  <h3>${g.title}</h3>
                  <p class="muted">${g.pain}</p>
                </div>
                <span class="score-badge">${state.selectedGoals.includes(id) ? "Selected" : "Select"}</span>
              </div>
            `).join("")}
          </div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(1)">Back</button><button class="primary-btn" onclick="go(3)">Show insight fit</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderStep3() {
      const target = document.getElementById("screen3Content");
      const goals = selectedGoalObjects();
      const isShopping = state.customerType === "Shopping Centre";
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">PFM fit</div>
          <h2>Translate pains into <span class="highlight">actionable insights</span></h2>
          <p class="muted">${isShopping ? "This is how PFM translates the selected challenges into an asset intelligence approach: from visitor flow and catchment to tenant, parking and portfolio insight." : "This is the practical insight layer: what PFM helps you see, explain and improve across stores."}</p>
          <div class="outcome-list">
            ${goals.map(g => `
              <div class="outcome-item">
                <div class="pain-icon" style="margin:0;">${g.icon}</div>
                <div>
                  <h3>${g.insightFit}</h3>
                  <p class="muted" style="margin:0 0 10px;">${g.outcome}</p>
                  <div>${g.questions.slice(0,2).map(q => `<span class="tag">${q}</span>`).join("")}</div>
                  ${g.modules ? `<div style="margin-top:10px;">${g.modules.map(m => `<span class="tag">${m}</span>`).join("")}</div>` : ""}
                </div>
                <span class="score-badge">PFM fit</span>
              </div>`).join("")}
          </div>
          <div class="quote-box">
            <div class="kicker">Suggested sales story</div>
            <h3>${isShopping ? "“PFM helps shopping centres move from counting entrances to understanding asset performance: traffic, zones, tenants, parking, catchment, leasing and portfolio health in one intelligence layer.”" : "“PFM does not only count visitors. We connect movement, sales and context to show where retail performance leaks — and what action creates measurable upside.”"}</h3>
            <p>${isShopping ? "Use this page to align on the value story: which asset challenges matter most, which insights are needed, and which next step creates the strongest business case." : "Use this page as the bridge from commercial challenges to measurable retail performance improvement."}</p>
          </div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(2)">Back</button><button class="primary-btn" onclick="go(4)">${isShopping ? "Build value model" : "Build impact model"}</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderModuleCards() {
      const active = activeComponents();
      if (!active.length) return "";
      return `<div class="scope-table">${active.map(c => `
        <div class="scope-row">
          <div><strong>${c.component_label}</strong><small>${c.quote_note}</small></div>
          <div><span class="muted">Scope</span><br><strong>${c.stores_in_scope}</strong></div>
          <div><span class="muted">Units</span><br><strong>${c.units}</strong></div>
          <div><span class="muted">TCO</span><br><strong>${euro(c.tco_total)}</strong></div>
        </div>`).join("")}</div>`;
    }

    function activeModuleChips() {
      return activeComponents().map(c => `<span class="fit-chip">✅ ${c.component_label}</span>`).join("");
    }

    function renderRoiOutput(c) {
      const horizon = Number(state.values.tcoYears || 1);
      return `
        <div class="roi-output-grid">
          <div class="roi-main-card">
            <small>Payback time</small>
            <strong>${c.paybackMonths ? c.paybackMonths.toFixed(1) + " mo." : "n/a"}</strong>
            <span>Based on realistic profit after monthly service.</span>
          </div>
          <div class="roi-mini-card"><small>Revenue baseline / year</small><strong>${euro(c.baselineRevenue)}</strong></div>
          <div class="roi-mini-card"><small>Total CAPEX</small><strong>${euro(c.capexTotal)}</strong></div>
          <div class="roi-mini-card"><small>Monthly service</small><strong>${euro(c.monthlyServiceTotal)}</strong></div>
          <div class="roi-mini-card"><small>TCO over ${horizon} years</small><strong>${euro(c.tco)}</strong></div>
          <div class="roi-mini-card"><small>Realistic extra profit / year</small><strong>${euro(c.realisticProfit)}</strong></div>
          <div class="roi-mini-card"><small>ROI over horizon</small><strong>${pct(c.roi)}</strong></div>
        </div>
      `;
    }

    function impactId(key) { return `impact_${key}`; }

    function rangeNumber(key, label, min, max, step, value, formatter) {
      const id = impactId(key);
      return `<div class="slider-group"><label>${label}<span class="slider-value" id="${id}Value">${formatter(value)}</span></label><div class="range-number-row"><input type="range" id="${id}" data-state-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}"><input type="number" id="${id}Number" data-state-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}"></div></div>`;
    }

    function compactNumberInput(key, label, value, step, min, max, formatter) {
      const id = impactId(key);
      const maxAttr = max === null || max === undefined ? "" : `max="${max}"`;
      return `<div class="impact-number-card"><label>${label}<span class="slider-value" id="${id}Value">${formatter(value)}</span></label><input type="number" id="${id}" data-state-key="${key}" min="${min}" ${maxAttr} step="${step}" value="${value}"></div>`;
    }

    function roiScenarioSelect() {
      const options = Object.entries(REALISATION_MAP).map(([name,value]) => `<option value="${value}" ${Number(state.values.realisationFactor) === Number(value) ? "selected" : ""}>${name} · ${pct(value,0)}</option>`).join("");
      return `<div class="slider-group"><label>Realisation scenario<span class="slider-value" id="${impactId("realisationFactor")}Value">${pct(Number(state.values.realisationFactor || 0),0)}</span></label><select class="scenario-select" id="${impactId("realisationFactor")}" data-state-key="realisationFactor">${options}</select></div>`;
    }

    function renderStep4() {
      const target = document.getElementById("screen4Content");
      if (state.customerType === "Shopping Centre") { renderShoppingValueModel(); return; }
      const c = calc();
      const capture = hasCaptureFit();
      const instore = hasInstoreFit();
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">Impact model</div>
          <h2>Compact outside, <span class="highlight">official ROI logic inside</span></h2>
          <p class="muted">The buying journey stays simple. Under the hood this follows the trusted ROI calculator logic and only extends TCO with active PFM fit modules.</p>
          <div class="impact-v13-grid">
            <div class="impact-input-panel">
              <div class="impact-section-title"><div><h3>Business assumptions</h3><p>Editable in this step for scenario testing.</p></div></div>
              <div class="impact-slider-grid">
                ${rangeNumber("weeklyFootfall", "Footfall / week per store", 0, 70000, 100, state.values.weeklyFootfall, v => Number(v).toLocaleString("de-DE"))}
                <div class="inline-input-row">
                  ${compactNumberInput("conversionRate", "Current conversion rate", state.values.conversionRate, 0.1, 0, 100, v => pct(v))}
                  ${compactNumberInput("avgTicket", "Average ticket value", state.values.avgTicket, 1, 0, null, v => euro(v))}
                </div>
                ${slider("grossMargin", "Gross margin", 5, 95, 1, state.values.grossMargin, v => pct(v,0))}
                ${capture ? slider("footfallUplift", "Expected footfall uplift from capture", 0, 10, .1, state.values.footfallUplift, v => pct(v)) : ""}
                ${slider("conversionUplift", "Conversion uplift through PFM", 0, 10, .1, state.values.conversionUplift, v => pct(v))}
                ${slider("atvUplift", "ATV uplift", 0, 10, .1, state.values.atvUplift, v => pct(v))}
                ${roiScenarioSelect()}
              </div>
              <div class="fit-module-strip" id="fitModuleStrip">${activeModuleChips()}</div>
              <details class="advanced-impact">
                <summary>Advanced scope & pricing assumptions</summary>
                <div class="advanced-body">
                  <div class="pricing-grid-v13">
                    ${numberField("openDays", "Open days / week", state.values.openDays)}
                    ${numberField("tcoYears", "Contract term / years", state.values.tcoYears)}
                    ${capture ? numberField("captureStores", "Capture stores in scope", clamp(Number(state.values.captureStores ?? 0), 0, Number(state.values.locations || 0))) : ""}
                    ${instore ? numberField("instoreStores", "In-store pilot stores", Math.min(state.values.instoreStores, state.values.locations)) : ""}
                    ${instore ? numberField("avgStoreSqm", "Average store size m²", state.values.avgStoreSqm) : ""}
                  </div>
                  <div style="height:14px"></div>
                  <div id="moduleCardsHost">${renderModuleCards()}</div>
                </div>
              </details>
            </div>
            <div class="impact-output-panel" id="impactOutputPanel">
              <div class="impact-section-title"><div><h3>ROI output</h3><p>Same logic as the official calculator.</p></div></div>
              <div id="roiOutputInner">${renderRoiOutput(c)}</div>
            </div>
          </div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(3)">Back</button><button class="primary-btn" onclick="go(5)">Choose route</button></div>
        </div>
        ${renderSummary()}`;
      attachImpactInputs();
    }

    function slider(key, label, min, max, step, value, formatter) {
      const id = impactId(key);
      return `<div class="slider-group"><label>${label}<span class="slider-value" id="${id}Value">${formatter(value)}</span></label><input type="range" id="${id}" data-state-key="${key}" min="${min}" max="${max}" step="${step}" value="${value}"></div>`;
    }

    function numberField(key, label, value) {
      const id = impactId(key);
      return `<div class="number-field"><label>${label}<span class="slider-value" id="${id}Value">${value}</span></label><input type="number" id="${id}" data-state-key="${key}" value="${value}" min="0" step="1"></div>`;
    }

    function attachImpactInputs() {
      const formatters = {
        weeklyFootfall: v => Number(v).toLocaleString("de-DE"),
        conversionRate: v => pct(Number(v)),
        avgTicket: v => euro(Number(v)),
        grossMargin: v => pct(Number(v),0),
        footfallUplift: v => pct(Number(v)),
        conversionUplift: v => pct(Number(v)),
        atvUplift: v => pct(Number(v)),
        openDays: v => Number(v),
        tcoYears: v => Number(v),
        captureStores: v => Number(v),
        instoreStores: v => Number(v),
        avgStoreSqm: v => Number(v),
        realisationFactor: v => pct(Number(v),0)
      };
      const refresh = (key, value) => {
        state.values[key] = Number(value);
        if (key === "captureStores") state.values.captureStores = clamp(state.values.captureStores, 0, Number(state.values.locations || 0));
        if (key === "instoreStores") state.values.instoreStores = clamp(state.values.instoreStores, 0, Number(state.values.locations || 0));
        const id = impactId(key);
        const label = document.getElementById(`${id}Value`);
        if (label && formatters[key]) label.textContent = formatters[key](state.values[key]);
        const twin = document.getElementById(`${id}Number`);
        if (twin && Number(twin.value) !== Number(state.values[key])) twin.value = state.values[key];
        const el = document.getElementById(id);
        if (el && el.type === "range" && Number(el.value) !== Number(state.values[key])) el.value = state.values[key];
        const currentCalc = calc();
        const output = document.getElementById("roiOutputInner");
        if (output) output.innerHTML = renderRoiOutput(currentCalc);

        // Keep the visible scope/module cards in sync while editing advanced assumptions.
        // Previously the state was updated, but the module cards only refreshed after Next/Back.
        const moduleCardsHost = document.getElementById("moduleCardsHost");
        if (moduleCardsHost) moduleCardsHost.innerHTML = renderModuleCards();
        const fitModuleStrip = document.getElementById("fitModuleStrip");
        if (fitModuleStrip) fitModuleStrip.innerHTML = activeModuleChips();

        // Sync visible input and label values, including number-only fields without a range twin.
        const currentInput = document.getElementById(id);
        if (currentInput && currentInput.type !== "range" && Number(currentInput.value) !== Number(state.values[key])) currentInput.value = state.values[key];

        // Update all Live Scan Summary instances. Multiple steps can contain a summary
        // with the same id while hidden, so getElementById can hit the wrong one.
        document.querySelectorAll("#summaryRealisticProfit").forEach(el => {
          el.textContent = euro(currentCalc.realisticProfit);
        });
        document.querySelectorAll("#summaryWeeklyFootfall").forEach(el => {
          el.textContent = Number(state.values.weeklyFootfall || 0).toLocaleString("de-DE");
        });
        renderHero();
      };
      ["weeklyFootfall","conversionRate","avgTicket","grossMargin","footfallUplift","conversionUplift","atvUplift","openDays","tcoYears","captureStores","instoreStores","avgStoreSqm"].forEach(key => {
        const id = impactId(key);
        const el = document.getElementById(id);
        if (el) { el.addEventListener("input", () => refresh(key, el.value)); el.addEventListener("change", () => refresh(key, el.value)); }
        const twin = document.getElementById(`${id}Number`);
        if (twin) { twin.addEventListener("input", () => refresh(key, twin.value)); twin.addEventListener("change", () => refresh(key, twin.value)); }
      });
      const realisation = document.getElementById(impactId("realisationFactor"));
      if (realisation) {
        realisation.addEventListener("change", () => refresh("realisationFactor", realisation.value));
      }
    }

    function shoppingModuleGroups() {
      const subs = hiddenSubscriptions();
      const includes = prefix => subs.filter(s => s.includes(prefix));
      const selected = selectedGoalObjects();
      const modules = [...new Set(selected.flatMap(g => g.modules || []))];
      return [
        { title: "Sensor-based foundation", body: "3D entrance, zone, facility and tenant counting where accurate and validated counts are required.", items: modules.filter(m => /Sensor|Entrance|Zone|Tenant|Facility|Demographics|Dwell|Cross/i.test(m)) },
        { title: "Smart data / geo-app layer", body: "Catchment, competitor overlap, brand affinity, visitor frequency and household profile. This is a data service, not extra sensor hardware.", items: modules.filter(m => /Geo|Catchment|Brand|Battlecard|Smart|Leasing|Marketing/i.test(m)) },
        { title: "ANPR / mobility layer", body: "Car counts, vehicle dwell, parking occupancy, origin country/region and mobility pressure for retail parks or car-led centres.", items: modules.filter(m => /ANPR|Parking|Vehicle|Cross-border|Mobility/i.test(m)) },
        { title: "Portfolio / BI layer", body: "Executive dashboards, benchmarking, LVI/asset health, forecasting and portfolio ranking.", items: modules.filter(m => /Portfolio|LVI|Forecast|Executive|Benchmark/i.test(m)) }
      ].filter(g => g.items.length);
    }

    function renderShoppingValueModel() {
      const target = document.getElementById("screen4Content");
      const groups = shoppingModuleGroups();
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">Shopping centre value model</div>
          <h2>From counts to <span class="highlight">asset intelligence</span></h2>
          <p class="muted">Shopping centre value is not calculated like retail conversion ROI. The model starts with the chosen asset pains and turns them into the required data layers, reporting modules and feasibility checks.</p>
          <div class="outcome-list">
            ${groups.map(g => `
              <div class="outcome-item">
                <div class="pain-icon" style="margin:0;">${g.title.includes("Smart") ? "🗺️" : g.title.includes("ANPR") ? "🚗" : g.title.includes("Portfolio") ? "📊" : "📡"}</div>
                <div>
                  <h3>${g.title}</h3>
                  <p class="muted" style="margin:0 0 10px;">${g.body}</p>
                  <div>${g.items.map(i => `<span class="tag">${i}</span>`).join("")}</div>
                </div>
                <span class="score-badge">Active</span>
              </div>
            `).join("")}
          </div>
          <div class="notice" style="margin-top:22px;">Next step: pricing and packages for Shopping Centre should be defined separately from Retail Chain. No fake ROI claim is shown here yet.</div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(3)">Back</button><button class="primary-btn" onclick="go(5)">Choose route</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderShoppingRoute() {
      const target = document.getElementById("screen5Content");
      const routeCards = [
        { id: "starter", name: "Foundation", headline: "Trusted centre baseline", promise: "For centres that first need reliable entrance counts, trend proof and benchmark reporting.", tags: ["Entrance counting", "Data validation", "Benchmark report"] },
        { id: "performance", name: "Asset Intelligence", headline: "Flow, tenant and catchment insight", promise: "For teams that need to connect entrances, zones, tenant capture, geo-app data and leasing evidence.", tags: ["Zone flow", "Tenant capture", "Smart data", "Brand affinity"] },
        { id: "intelligence", name: "Portfolio Intelligence", headline: "Asset health and portfolio control", promise: "For owners that want LVI, portfolio ranking, forecasting, executive reporting and advanced data layers.", tags: ["LVI", "Portfolio dashboard", "Forecasting", "Executive view"] }
      ];
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">Recommended route</div>
          <h2>Choose the <span class="highlight">asset intelligence route</span></h2>
          <p class="muted">The selected challenges determine which value route is most relevant for the conversation.</p>
          <div class="package-grid">
            ${routeCards.map(p => `
              <div class="package-card ${state.selectedPackage === p.id ? "active" : ""}" onclick="selectPackage('${p.id}')">
                <h3>${p.name}</h3>
                <p class="muted">${p.headline}</p>
                <p class="muted">${p.promise}</p>
                <div>${p.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
              </div>
            `).join("")}
          </div>
          <div class="notice" style="margin-top:24px;">This route is indicative and can be refined after a technical and commercial review.</div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(4)">Back</button><button class="primary-btn" onclick="go(6)">View summary</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderStep5() {
      const target = document.getElementById("screen5Content");
      if (state.customerType === "Shopping Centre") { renderShoppingRoute(); return; }
      syncRecommendedPackage();
      const recommended = recommendedPackageKey();
      const totals = commercialTotals();
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">Recommended route</div>
          <h2>Your suggested <span class="highlight">PFM Intelligence route</span></h2>
          <p class="muted">The route is selected automatically from the needs you chose. The monthly service shown below comes from the current Impact Model scope, not from a fixed package price.</p>
          <div class="metric-grid" style="margin-top:20px;">
            <div class="metric-card primary"><small>Recommended route</small><strong>${routeLabel()}</strong></div>
            <div class="metric-card"><small>Monthly service from current scope</small><strong>${euro(totals.monthlyServiceTotal)} / mo.</strong></div>
          </div>
          <div class="package-grid">
            ${Object.entries(packages).map(([id,p]) => `
              <div class="package-card ${recommended === id ? "active" : ""}">
                <h3>${p.name}</h3>
                <p class="muted">${p.headline}</p>
                <div class="package-price">${recommended === id ? `${euro(totals.monthlyServiceTotal)} / mo.` : "Not selected"}</div>
                <p class="muted">${p.promise}</p>
                <div>${p.contains.map(c => `<span class="tag">${c}</span>`).join("")}</div>
              </div>
            `).join("")}
          </div>
          <div class="notice" style="margin-top:24px;"><strong>Why this route?</strong> ${routeReason()} The route can still be refined after a technical and commercial review.</div>
          <div class="page-actions"><button class="ghost-btn" onclick="go(4)">Back</button><button class="primary-btn" onclick="go(6)">View summary</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderStep6() {
      const target = document.getElementById("screen6Content");
      const c = calc();
      const goals = selectedGoalObjects();
      const components = activeComponents();
      target.innerHTML = `
        <div class="content-card">
          <div class="kicker">Conversation summary</div>
          <h2>Your <span class="highlight">retail performance opportunity</span></h2>
          <p class="muted">This summary captures the selected challenges, the matching PFM insight fit and the indicative commercial impact. It is intended as a conversation starter and can be refined into a tailored proposal after the session.</p>

          <div class="metric-grid" style="margin-top:24px;">
            <div class="metric-card primary"><small>Potential payback</small><strong>${c.paybackMonths ? c.paybackMonths.toFixed(1) + " mo." : "n/a"}</strong></div>
            <div class="metric-card"><small>Indicative extra profit / year</small><strong>${euro(c.realisticProfit)}</strong></div>
            <div class="metric-card"><small>Stores in scope</small><strong>${state.values.locations}</strong></div>
            <div class="metric-card"><small>Recommended route</small><strong>${routeLabel()}</strong></div>
          </div>

          <div class="outcome-list" style="margin-top:24px;">
            ${goals.map(g => `
              <div class="outcome-item">
                <div class="pain-icon" style="margin:0;">${g.icon}</div>
                <div>
                  <h3>${g.insightFit}</h3>
                  <p class="muted" style="margin:0;">${g.outcome}</p>
                </div>
                <span class="score-badge">Selected</span>
              </div>`).join("")}
          </div>

          <div class="quote-box">
            <div class="kicker">Suggested next step</div>
            <h3>Validate the assumptions and define the right scope.</h3>
            <p>PFM can use this scan as a starting point for a tailored performance proposal, including the required data layers, solution scope and commercial route.</p>
          </div>

          <div class="page-actions"><button class="ghost-btn" onclick="go(5)">Back</button><button class="primary-btn" onclick="go(1)">Start new scan</button></div>
        </div>
        ${renderSummary()}`;
    }

    function renderHero() {
      const name = state.values.clientName || (state.customerType === "Shopping Centre" ? "your centre" : "your retail chain");
      document.getElementById("heroCompany").textContent = name;
      const miniUpside = document.getElementById("miniUpside");
      if (miniUpside) miniUpside.textContent = euro(calc().realisticProfit || 420000);
      document.querySelectorAll(".customer-card").forEach(card => card.classList.toggle("active", card.dataset.type === state.customerType));
    }

    function renderActiveStep() {
      if (state.step === 2) renderStep2();
      if (state.step === 3) renderStep3();
      if (state.step === 4) renderStep4();
      if (state.step === 5) renderStep5();
      if (state.step === 6) renderStep6();
    }

    function renderAll(rebuildContext = true) {
      readInputs();
      document.querySelectorAll(".screen").forEach(screen => {
        const isActive = Number(screen.dataset.screen) === Number(state.step);
        screen.classList.toggle("active", isActive);
        screen.style.display = isActive ? "block" : "none";
      });
      renderNav();
      renderHero();
      if (rebuildContext) renderContextFields();
      renderActiveStep();
    }

    function go(step) {
      state.step = Math.max(1, Math.min(6, step));
      renderAll(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleGoal(id) {
      if (state.selectedGoals.includes(id)) {
        state.selectedGoals = state.selectedGoals.filter(g => g !== id);
      } else {
        state.selectedGoals.push(id);
      }
      if (!state.selectedGoals.length) state.selectedGoals = [id];
      renderAll(false);
    }

    function selectPackage(id) {
      state.selectedPackage = id;
      renderAll(false);
    }

    function downloadPayload() {
      const blob = new Blob([JSON.stringify(payload(), null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "pfm_retail_potential_scan_payload.json";
      a.click();
      URL.revokeObjectURL(a.href);
    }

    document.getElementById("nextBtn").addEventListener("click", () => go(state.step + 1));
    document.getElementById("backBtn").addEventListener("click", () => go(state.step - 1));
    document.querySelectorAll(".lang-btn").forEach(btn => btn.addEventListener("click", () => { state.lang = btn.dataset.lang; renderAll(true); }));
    document.querySelectorAll(".customer-card").forEach(card => card.addEventListener("click", () => {
      state.customerType = card.dataset.type;
      if (state.customerType === "Retail Chain") state.selectedGoals = ["baseline_missing", "visitors_not_buying"];
      if (state.customerType === "Shopping Centre") state.selectedGoals = ["centre_baseline", "tenant_capture", "catchment_geo"];
      renderAll(true);
    }));

    document.getElementById("clientName").addEventListener("input", () => { readInputs(); renderHero(); renderAll(false); });
    document.getElementById("preparedBy").addEventListener("change", () => { readInputs(); renderAll(false); });

    populateSalespeople();
    renderContextFields();
    renderAll(true);
  