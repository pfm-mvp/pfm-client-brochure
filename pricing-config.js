// PFM Pricing Configuration
// -----------------------------------------------------------------------------
// Source of truth for indicative pricing used by the PFM Retail Potential Scan.
// Update values here instead of editing index.html.
// Amounts are in EUR unless stated otherwise.
// Notes:
// - Some Shopping Centre modules are included for future scope/TCO logic.
// - Null means pricing still requires confirmation/feasibility check.
// - Annual prices are also given as monthly equivalents where useful.

window.PFM_PRICING = {
  meta: {
    version: "2026-06-24-v29",
    currency: "EUR",
    defaultContractYears: 3,
    notes: "Central pricing config for Retail Chain and Shopping Centre flows."
  },

  retail: {
    entrancePerformance: {
      capexPerStore: 1500,
      monthlyPerStore: 21,
      defaultSensorsPerStore: 1,
      note: "Premium entrance counter model used by the official ROI calculator."
    },
    captureRate: {
      capexPerStore: 500,
      monthlyPerStore: 10,
      defaultScopeStores: 10,
      note: "Street/capture layer. Scope can be adjusted in the Impact Model."
    },
    instoreJourney: {
      capexPerSqm: 35,
      monthlyPerSensor: 125,
      defaultPilotStores: 1,
      defaultAverageStoreSqm: 150,
      sqmCoveragePerSensor: 75,
      mountingHeightAssumptionMeters: 2.95,
      note: "Indicative in-store analytics: sensor count = ceil(avg sqm / 75)."
    },
    demographics: {
      genderMonthlyPerSensor: 5,
      adultChildMonthlyPerSensor: 5,
      ageMonthlyPerSensorFuture: 5,
      groupMonthlyPerSensor: 5,
      dashboardMonthly: 0,
      defaultActivationScope: "entrances",
      note: "Same dataset/add-on prices as Shopping Centre. These are license/data add-ons on activated 3D sensors."
    }
  },

  routePackages: {
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
  },

  shoppingCentre: {
    sensors3d: {
      indoorEntrance: {
        capexLow: 1295,
        capexHigh: 1650,
        capexDefault: 1650,
        maxHeightMeters: 6,
        monthlyPerSensor: 16.5,
        dataValidationIncluded: true,
        note: "Sensor choice/price depends on entrance width up to 6m mounting height."
      },
      indoorHighCeiling: {
        capexDefault: 2750,
        minHeightMeters: 6,
        monthlyPerSensor: 16.5
      },
      outdoorEntrance: {
        capexDefault: 2000,
        maxHeightMeters: 6,
        monthlyPerSensor: 16.5
      },
      outdoorHighCeiling: {
        capexDefault: 2900,
        minHeightMeters: 6,
        monthlyPerSensor: 16.5
      },
      zoneSensor: {
        capexLow: 1295,
        capexHigh: 1650,
        capexDefault: 1650,
        capexHighCeiling: 2750,
        monthlyPerSensor: 16.5,
        defaultZonesIfUnknown: 5
      }
    },

    dashboards: {
      centreDashboardMonthly: 125,
      entrancePerformanceReportingIncluded: true,
      benchmarkIndexIncluded: true,
      zoneDashboardIncluded: true,
      tenantCaptureDashboardIncluded: true,
      parkingDashboardMonthly: null,
      portfolioDashboardMonthly: null
    },

    tenantCapture: {
      directTenantSensor: {
        capexLow: 1295,
        capexHigh: 1645,
        capexDefault: 1645,
        monthlyPerSensor: 10
      },
      corridorMultiTenantSensor: {
        capexDefault: 2750,
        monthlyPerSensor: 10,
        tenantEntrancesCoveredPerSensor: 3,
        note: "Often possible with >6m ceiling height, depending on geometry."
      },
      defaultSelectedTenants: 60,
      averageEntrancesPerTenant: 1,
      tenantCaptureAnalyticsIncluded: true
    },

    leasing: {
      battlecardOneOff: 1000,
      dashboardMonthly: 100,
      unitHeatmapLayerIncluded: true,
      brandCategoryAnalysisIncluded: true
    },

    smartData: {
      geoAppDataYearlyPerAsset: 6000,
      geoAppDataMonthlyPerAsset: 500,
      billingModel: "yearly_recalculated_to_monthly",
      includedCompetitorLocations: 2,
      extraCompetitorLocationPrice: 500,
      extraCompetitorLocationBillingModel: "one_off_assumption",
      catchmentDashboardIncluded: true,
      geoSnapshotOneOff: 750
    },

    brandAffinity: {
      brandAffinityAddOnYearly: 1000,
      brandAffinityAddOnMonthly: 83.33,
      tenantMixReportOneOff: 500,
      leasingTargetListOneOff: 500,
      categoryGapAnalysisOneOff: 500
    },

    anpr: {
      sensorCapex: null,
      monthlyPerSensor: null,
      parkingOccupancyDashboardMonthly: null,
      vehicleDwellAnalyticsMonthly: null,
      defaultSensorsPerCarAccessPoint: 1,
      note: "Base ANPR CAPEX/monthly still needs confirmation. For dwell time, entrances and exits need coverage."
    },

    anprOrigin: {
      vehicleOriginOneOffPerSensor: 100,
      countryRegionDashboardMonthlyPerSensor: 10
    },

    reid: {
      feasibilityOneOff: null,
      ipCameraCapex: null,
      serverSoftwareSetup: null,
      serverCameraCapacity: 4,
      monthlyPerSensor: 10,
      crossShoppingAnalysisMonthly: null,
      requiresIpCamera: true,
      subjectToPrivacyReview: true,
      note: "Advanced module; pricing and feasibility/privacy review required."
    },

    demographics: {
      genderMonthlyPerSensor: 5,
      adultChildMonthlyPerSensor: 5,
      ageMonthlyPerSensorFuture: 5,
      groupMonthlyPerSensor: 5,
      dashboardMonthly: 0,
      defaultActivationScope: "entrances"
    },

    eventMarketing: {
      eventMonitorMonthly: 100,
      eventReportOneOff: 750,
      weatherContextIncluded: true,
      socialMediaIntegrationSetup: 750,
      socialMediaIntegrationMonthly: 100
    },

    lvi: {
      setupWorkshopOneOff: 1500,
      dashboardMonthly: 100,
      portfolioBenchmarkMonthlyPerAssetIncluded: true,
      forecastingLayerMonthly: 100,
      executiveReportingMonthly: 100
    }
  }
};
