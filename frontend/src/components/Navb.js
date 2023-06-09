import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React from "react";
import { useLocation } from "react-router-dom";
import "./page.css";

//categories。
// 这就是懒省事，直接在 navb里面 fetch 一下category，admin products会用到，但是如果user login了就会报错，因为没有权限
/* import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getCategories } from "../redux/actions/categoryActions"; */

const Navb = () => {
  // DO NOT REMOVE OR COMMENT THE CATEGORIES PART, IT WILL USED IN OTHER FILES
  //categories
  /*   const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getCategories());
    }, [dispatch]); */

  /* ************** Brands ************* */
  /*   var BRANDS = [
      {
        label: "Paramount Safety",
        type: 1,
        link: "/product-list?brandName=PARAMOUNT-SAFETY",
        Brand_Logo: "/images/Brands/PARAMOUNT.jpg",
      },
      {
        label: "IP-ENCLOSURES",
        type: 1,
        link: "/product-list?brandName=IP-ENCLOSURES",
        Brand_Logo: "/images/Brands/IP-ENCLOSURES.png",
      },
      {
        label: "SWARTS TOOLS",
        type: 1,
        link: "/product-list?brandName=SWARTS-TOOLS",
        Brand_Logo: "/images/Brands/SWARTS-logo.jpg",
      },
      {
        label: "HOBSON",
        type: 1,
        link: "/product-list?brandName=HOBSON",
        Brand_Logo: "/images/Brands/Hobson.png",
      },
      {
        label: "MASTER LOCK",
        type: 1,
        link: "/product-list?brandName=MASTER-LOCK",
        Brand_Logo: "/images/Brands/master-lock-vector.png",
      },
      {
        label: "MINETECH TOOLS",
        type: 1,
        link: "/product-list?brandName=MINETECH-TOOLS",
        Brand_Logo: "/images/Brands/MINTECH.jpg",
      },
      {
        label: "INTEGRATED POWER",
        type: 1,
        link: "/product-list?brandName=INTEGRATED-POWER",
        Brand_Logo: "/images/Brands/integrated-power.jpg",
      },
    ]; */

  /* ************** Categories ************* */
  var nav_color = {
    2: "subCat",
    3: "childCat",
    4: "fourCat",
  };

  /* FABRICATION */
  var FABRICATION = "/product-list?categoryName=FABRICATION";
  var FABRICATION_WELD_HEAT_CUT_BRAZE = PROCESSING + "&subCategoryName=WELD-HEAT-CUT-BRAZE";
  var FABRICATION_WELD_HEAT_CUT_BRAZE_SUB = [
    {
      label: "GAS WELDING, HEATING, CUTTING & BRAZING",
      type: 2,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE,

    },
    {
      label: "BRAZING ALLOYS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=BRAZING-ALLOYS",
    },
    {
      label: "GAS CUTTERS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-CUTTERS",
    },
    {
      label: "FLUX",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=FLUX",
    },
    {
      label: "GAS RODS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-RODS",
    },
    {
      label: "AIR FUEL EQUIPMENT",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=AIR-FUEL-EQUIPMENT",
    },
    {
      label: "FLASHBACK ARRESTORS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=FLASHBACK-ARRESTORS",
    },
    {
      label: "GAS WELDING & CUTTING KITS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-WELDING-CUTTING-KITS",
    },
    {
      label: "GAS EQUIPMENT & ACCESSORIES",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-EQUIPMENT-ACCESSORIES",
    },
    {
      label: "GAS HOSES & FITTINGS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-HOSES-FITTINGS",
    },
    {
      label: "GAS REGULATORS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-REGULATORS",
    },
    {
      label: "GAS REGULATOR ACCESSORIES",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-REGULATOR-ACCESSORIES",
    },
    {
      label: "GAS TORCHES & FITTINGS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-TORCHES-FITTINGS",
    },
    {
      label: "THERMIC LANCES & ACCESSORIES",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=THERMIC-LANCES-ACCESSORIES",
    },
    {
      label: "GAS NOZZLES & TIPS",
      type: 3,
      link: FABRICATION_WELD_HEAT_CUT_BRAZE + "&childCategoryName=GAS-NOZZLES-TIPS",
    },

  ];
  var FABRICATION_MIG_FLUX_CORED_WELDING = PROCESSING + "&subCategoryName=MIG-FLUX-CORED-WELDING";
  var FABRICATION_MIG_FLUX_CORED_WELDING_SUB = [
    {
      label: "MIG & FLUX-CORED WELDING ",
      type: 2,
      link: FABRICATION_MIG_FLUX_CORED_WELDING,

    },
    {
      label: "ARC WELDING ACCESSORIES",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=ARC-WELDING-ACCESSORIES",
    },
    {
      label: "FLUX CORE WELDING WIRES",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=FLUX-CORE-WELDING-WIRES",
    },
    {
      label: "MIG/MAG WELDERS",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MIG-MAG-WELDERS",
    },
    {
      label: "MIG/MAG WELDING EQUIPMENT",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MIG-MAG-WELDING-EQUIPMENT",
    },
    {
      label: "MIG/MAG WELDING WIRE",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MIG-MAG-WELDING-WIRE",
    },
    {
      label: "MIG TORCHES",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MIG-TORCHES",
    },
    {
      label: "MIG TORCH PARTS",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MIG-TORCH-PARTS",
    },
    {
      label: "MULTIPROCESS WELDERS",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=MULTIPROCESS-WELDERS",
    },
    {
      label: "WELDING FUME EXTRACTION",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=WELDING-FUME-EXTRACTION",
    },
    {
      label: "WIRE FEEDER & WIRE FEEDER PARTS",
      type: 3,
      link: FABRICATION_MIG_FLUX_CORED_WELDING + "&childCategoryName=WIRE-FEEDER-WIRE-FEEDER-PARTS",
    },
  ];
  var FABRICATION_TIG_STICK_MMA_WELDING = PROCESSING + "&subCategoryName=TIG-STICK-MMA-WELDING";
  var FABRICATION_TIG_STICK_MMA_WELDING_SUB = [
    {
      label: "TIG, STICK & MMA WELDING",
      type: 2,
      link: FABRICATION_TIG_STICK_MMA_WELDING,

    },
    {
      label: "GOUGING CARBONS",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=GOUGING-CARBONS",
    },
    {
      label: "MMA/STICK WELDERS",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=MMA-STICK-WELDERS",
    },
    {
      label: "STICK WELDING (MMA) ELECTRODES",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=STICK-WELDING-ELECTRODES",
    },
    {
      label: "STICK WELDING (MMA) EQUIPMENT",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=STICK-WELDING-EQUIPMENT",
    },
    {
      label: "TIG WELDERS",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-WELDERS",
    },
    {
      label: "TIG FILLER RODS",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-FILLER-RODS",
    },
    {
      label: "TIG TUNGSTEN ELECTRODES",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-TUNGSTEN-ELECTRODES",
    },
    {
      label: "TIG TORCHES",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-TORCHES",
    },
    {
      label: "TIG TORCH PARTS",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-TORCH-PARTS",
    },
    {
      label: "TIG WELDING ACCESSORIES",
      type: 3,
      link: FABRICATION_TIG_STICK_MMA_WELDING + "&childCategoryName=TIG-WELDING-ACCESSORIES",
    },
  ];

  /* MINING */
  var MINING = "/product-list?categoryName=MINING";

  /* PROCESSING */
  var PROCESSING = "/product-list?categoryName=PROCESSING";
  var PROCESSING_REAGENTS = PROCESSING + "&subCategoryName=REAGENTS";
  var PROCESSING_REAGENTS_SUB = [
    {
      label: "REAGENTS",
      type: 2,
      link: PROCESSING_REAGENTS,

    },
    {
      label: "LIME",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=LIME",
    },
    {
      label: "HYDROCHLORIC ACID",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=HYDROCHLORIC-ACID",
    },
    {
      label: "GOLD STANDARDS",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=GOLD-STANDARDS",
    },
    {
      label: "SILVER NITRATE",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SILVER-NITRATE",
    },
    {
      label: "CAUSTIC",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=CAUSTIC",
    },
    {
      label: "DIBK",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=DIBK",
    },
    {
      label: "SODA",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SODA",
    },
    {
      label: "ANTISCALANT",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=ANTISCALANT",
    },
    {
      label: "BORAX",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=BORAX",
    },
    {
      label: "SILICA",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=SILICA",
    },
    {
      label: "CARBON",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=CARBON",
    },
    {
      label: "LEACH AID",
      type: 3,
      link: PROCESSING_REAGENTS + "&childCategoryName=LEACH-AID",
    },

  ];
  var PROCESSING_GRINDING_MEDIA = [{
    label: "GRINDING MEDIA",
    type: 2,
    link: PROCESSING + "&subCategoryName=GRINDING-MEDIA",
  }];
  var PROCESSING_LAB_CHEMICALS = [{
    label: "LAB CHEMICALS",
    type: 2,
    link: PROCESSING + "&subCategoryName=LAB-CHEMICALS",
  }];
  var PROCESSING_LAB_EQUIPMENTS = [{
    label: "LAB EQUIPMENTS ",
    type: 2,
    link: PROCESSING + "&subCategoryName=LAB-EQUIPMENTS ",
  }];


  /* POWER AIR */
  var POWER_AIR = "/product-list?categoryName=POWER-AIR";
  var POWER_AIR_AIR = POWER_AIR + "&subCategoryName=AIR";
  var POWER_AIR_AIR_SUB = [
    {
      label: "AIR TOOLS",
      type: 2,
      link: POWER_AIR_AIR,

    },
    {
      label: "IMPACT WRENCHES",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=IMPACT-WRENCHES",
    },
    {
      label: "RATCHET WRENCHES",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=RATCHET-WRENCHES",
    },
    {
      label: "DIE GRINDERS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=DIE-GRINDERS",
    },
    {
      label: "ANGLE DIE GRINDERS",
      type: 3,
      link: POWER_AIR_AIR + "&childCategoryName=ANGLE-DIE-GRINDERS",
    },

  ];
  var POWER_AIR_POWER = POWER_AIR + "&subCategoryName=POWER";
  var POWER_AIR_POWER_SUB = [
    {
      label: "POWER TOOLS",
      type: 2,
      link: POWER_AIR_POWER,
    },
  ];
  var POWER_AIR_GENERATORS = POWER_AIR + "&subCategoryName=GENERATORS";
  var POWER_AIR_GENERATORS_SUB = [
    {
      label: "GENERATORS",
      type: 2,
      link: POWER_AIR_GENERATORS,
    },
  ];
  var POWER_AIR_COMPRESSORS = POWER_AIR + "&subCategoryName=COMPRESSORS";
  var POWER_AIR_COMPRESSORS_SUB = [
    {
      label: "COMPRESSORS",
      type: 2,
      link: POWER_AIR_COMPRESSORS,
    },
  ];

  /* PPE */
  var PPE = "/product-list?categoryName=PPE";
  // #region
  var PPE_HEADWEAR = PPE + "&subCategoryName=PROTECTIVE-HEADWEAR";
  var PPE_HEADWEAR3 = [
    { label: "PROTECTIVE HEADWEAR", type: 2, link: PPE_HEADWEAR },
    {
      label: "HARD HATS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HATS",
    },
    {
      label: "HARD HAT ACCESSORIES",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-ACCESSORIES",
    },
    {
      label: "HARD HATS WITH LAMP BRACKETS",
      type: 3,
      link: PPE_HEADWEAR + "&childCategoryName=HARD-HAT-WITH-LAMP-BRACKETS",
    },
  ];

  var PPE_FACE = PPE + "&subCategoryName=FACE-PROTECTION";
  var PPE_FACE3 = [
    { label: "FACE PROTECTION", type: 2, link: PPE_FACE },
    {
      label: "BROWGUARD/ VISOR COMBO",
      type: 3,
      link: PPE_FACE + "&childCategoryName=BROWGUARD-VISOR-COMBO",
    },
    {
      label: "FACE ACCESSORIES",
      type: 3,
      link: PPE_FACE + "&childCategoryName=FACE-ACCESSORIES",
    },
  ];

  var PPE_HEARING = PPE + "&subCategoryName=HEARING-PROTECTION";
  var PPE_HEARING3 = [
    { label: "HEARING PROTECTION", type: 2, link: PPE_HEARING },
    {
      label: "DISPOSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=DISPOSABLE-EARPLUGS",
    },
    {
      label: "REUSABLE EARPLUGS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=REUSABLE-EARPLUGS",
    },
    {
      label: "EARMUFFS",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=EARMUFFS",
    },
    {
      label: "HEARING ACCESSORIES",
      type: 3,
      link: PPE_HEARING + "&childCategoryName=HEARING-ACCESSORIES",
    },
  ];

  var PPE_EYE = PPE + "&subCategoryName=EYE-PROTECTION";
  var PPE_EYE3 = [
    { label: "EYE PROTECTION", type: 2, link: PPE_EYE },
    {
      label: "SAFETY GLASSES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=SAFETY-GLASSES",
    },
    {
      label: "EYE ACCESSORIES",
      type: 3,
      link: PPE_EYE + "&childCategoryName=EYE-ACCESSORIES",
    },
  ];

  var PPE_RESPIRATORY = PPE + "&subCategoryName=RESPIRATORY-GEAR";
  var PPE_RESPIRATORY3 = [
    { label: "RESPIRATORY GEAR", type: 2, link: PPE_RESPIRATORY },
    {
      label: "HALF MASKS & ACCESSORIES",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=HALF-MASKS-ACCESSORIES",
    },
    {
      label: "PROMESH",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=PROMESH",
    },
    {
      label: "DISPOSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=DISPOSABLE-RESPIRATORY",
    },
    {
      label: "REUSABLE RESPIRATORY",
      type: 3,
      link: PPE_RESPIRATORY + "&childCategoryName=REUSABLE-RESPIRATORY",
    },
  ];

  var PPE_HAND = PPE + "&subCategoryName=HAND-PROTECTION";
  var PPE_HAND3 = [
    { label: "HAND PROTECTION", type: 2, link: PPE_HAND },
    {
      label: "CUT RESISTANT RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=CUT-RESISTANT-RANGE",
    },
    {
      label: "LEATHER RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=LEATHER-RANGE",
    },
    {
      label: "DISPOSABLE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=DISPOSABLE-RANGE",
    },
    {
      label: "WELDING RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=WELDING-RANGE",
    },
    {
      label: "HAND ACCESSORIES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=HAND-ACCESSORIES",
    },
    {
      label: "VEND READY GLOVE RANGE",
      type: 3,
      link: PPE_HAND + "&childCategoryName=VEND-READY-GLOVE-RANGE",
    },
    {
      label: "GENERAL PURPOSE GLOVES",
      type: 3,
      link: PPE_HAND + "&childCategoryName=GENERAL-PURPOSE",
    },
  ];

  var PPE_WORKWEAR = PPE + "&subCategoryName=PROTECTIVE-WORKWEAR";
  var PPE_WORKWEAR3 = [
    { label: "PROTECTIVE WORKWEAR", type: 2, link: PPE_WORKWEAR },
    {
      label: "WELDING PROTECTION",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=WELDING-PROTECTION",
    },
    {
      label: "KNEE PADS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=KNEE-PADS",
    },
    {
      label: "APRONS",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=APRONS",
    },
    {
      label: "PROTECTIVE HEADWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-HEADWEAR",
    },
    {
      label: "PROTECTIVE FOOTWEAR",
      type: 3,
      link: PPE_WORKWEAR + "&childCategoryName=PROTECTIVE-FOOTWEAR",
    },
  ];

  var PPE_DISPOSABLE = PPE + "&subCategoryName=DISPOSABLE-PROTECTION";
  var PPE_DISPOSABLE3 = [
    { label: "DISPOSABLE PROTECTION", type: 2, link: PPE_DISPOSABLE },
    {
      label: "BODY PROTECTION",
      type: 3,
      link: PPE_DISPOSABLE + "&childCategoryName=BODY-PROTECTION",
    },
  ];

  var PPE_SUN = PPE + "&subCategoryName=SUN-PROTECTION";
  var PPE_SUN3 = [
    { label: "SUN PROTECTION", type: 2, link: PPE_SUN },
    {
      label: "SUNSCREEN",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUNSCREEN",
    },
    {
      label: "LIP BALM",
      type: 3,
      link: PPE_SUN + "&childCategoryName=LIP-BALM",
    },
    {
      label: "SUN PROTECTION ACCESSORIES",
      type: 3,
      link: PPE_SUN + "&childCategoryName=SUN-PROTECTION-ACCESSORIES",
    },
  ];

  var PPE_HYDRATION = PPE + "&subCategoryName=HYDRATION";
  var PPE_HYDRATION3 = [
    { label: "HYDRATION", type: 2, link: PPE_HYDRATION },
    {
      label: "HYDRATION CONCENTRATES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-CONCENTRATES",
    },
    {
      label: "COOLERS & DRINK BOTTLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLERS-DRINK-BOTTLES",
    },
    {
      label: "COOLING APPAREL",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=COOLING-APPAREL",
    },
    {
      label: "ICY POLES",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=ICY-POLES",
    },
    {
      label: "HYDRATION BACKPACK",
      type: 3,
      link: PPE_HYDRATION + "&childCategoryName=HYDRATION-BACKPACK",
    },
  ];
  // #endregion

  /* SITE_SAFETY */
  var SITE_SAFETY = "/product-list?categoryName=SITE-SAFETY";
  // #region
  var SS_DG_CABINETS = SITE_SAFETY + "&subCategoryName=DG-CABINETS";
  var SS_DG_CABINETS3 = [
    { label: "DANGEROUS GOODS CABINETS", type: 2, link: SS_DG_CABINETS },
  ];

  var SS_SHORES_EYEWASH =
    SITE_SAFETY + "&subCategoryName=EMERGENCY-SHOWERS-EYEWASH";
  var SS_SHORES_EYEWASH3 = [
    { label: "EMERGENCY SHOWERS & EYEWASH", type: 2, link: SS_SHORES_EYEWASH },
    {
      label: "COMBINATION UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=COMBINATION-UNITS",
    },
    {
      label: "FIXED WALL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-WALL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "FIXED PEDESTAL MOUNTED EYE WASH UNITS",
      type: 3,
      link:
        SS_SHORES_EYEWASH +
        "&childCategoryName=FIXED-PEDESTAL-MOUNTED-EYE-WASH-UNITS",
    },
    {
      label: "LABORATORY UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=LABORATORY-UNITS",
    },
    {
      label: "PORTABLE EYE WASH UNITS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=PORTABLE-EYE-WASH-UNITS",
    },
    {
      label: "SHOWER SPARE PARTS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-SPARE-PARTS",
    },
    {
      label: "SHOWER ACCESSORIES",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SHOWER-ACCESSORIES",
    },
    {
      label: "SIGNS",
      type: 3,
      link: SS_SHORES_EYEWASH + "&childCategoryName=SIGNS",
    },
  ];

  var SS_SPILL_KITS = SITE_SAFETY + "&subCategoryName=SPILL-KITS";
  var SS_SPILL_KITS_3 = [
    { label: "SPILL KITS", type: 2, link: SS_SPILL_KITS },
    {
      label: "GENERAL PURPOSE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=GENERAL-PURPOSE-SPILL-KITS",
    },
    {
      label: "HAZCHEM SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=HAZCHEM-SPILL-KITS",
    },
    {
      label: "OIL & FUEL SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=OIL-FUEL-SPILL-KITS",
    },
    {
      label: "LIGHT VEHICLE SPILL KITS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=LIGHT-VEHICLE-SPILL-KITS",
    },
    {
      label: "REFILLS",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=REFILLS",
    },
    {
      label: "ACCESSORIES",
      type: 3,
      link: SS_SPILL_KITS + "&childCategoryName=ACCESSORIES",
    },
  ];

  var SS_SPILL_CONTAINMENT = SITE_SAFETY + "&subCategoryName=SPILL-CONTAINMENT";
  var SS_SPILL_CONTAINMENT3 = [
    { label: "SPILL CONTAINMENT", type: 2, link: SS_SPILL_CONTAINMENT },
    {
      label: "SPILL PALLET",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-PALLET",
    },
    {
      label: "LOW PROFILE SPILL DECKS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=LOW-PROFILE-SPILL-DECKS",
    },
    {
      label: "IBC SPILL PALLETS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=IBC-SPILL-PALLETS",
    },
    {
      label: "SPILL TRAYS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=SPILL-TRAYS",
    },
    {
      label: "OVERPACK DRUMS",
      type: 3,
      link: SS_SPILL_CONTAINMENT + "&childCategoryName=OVERPACK-DRUMS",
    },
    {
      label: "SMOKE STOP CIGARETTE BUTT CANS",
      type: 3,
      link:
        SS_SPILL_CONTAINMENT +
        "&childCategoryName=SMOKE-STOP-CIGARETTE-BUTT-CANS",
    },
  ];

  var SS_FIRST_AID = SITE_SAFETY + "&subCategoryName=FIRST-AID";
  var SS_FIRST_AID3 = [
    { label: "FIRST AID", type: 2, link: SS_FIRST_AID },
    {
      label: "RESPONSE KITS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=RESPONSE-KITS",
    },
    {
      label: "REFILLS & REPLACEMENTS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=REFILLS-REPLACEMENTS",
    },
    {
      label: "EYEWASH",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=EYEWASH",
    },
    {
      label: "HYGIENE",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=HYGIENE",
    },
    {
      label: "DEFIBRILLATORS",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=DEFIBRILLATORS",
    },
    {
      label: "INCIDENT READY KIT",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=INCIDENT-READY-KIT",
    },
    {
      label: "MOTORIST",
      type: 3,
      link: SS_FIRST_AID + "&childCategoryName=MOTORIST",
    },
  ];

  var SS_ACCESSORIES = SITE_SAFETY + "&subCategoryName=ACCESSORIES";
  var SS_ACCESSORIES3 = [
    { label: "ACCESSORIES", type: 2, link: SS_ACCESSORIES },
    {
      label: "BARRIERS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRIERS",
    },
    {
      label: "BUNTING",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BUNTING",
    },
    {
      label: "PLASTIC CHAIN",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=PLASTIC-CHAIN",
    },
    {
      label: "SAFETY TAGS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=SAFETY-TAGS",
    },
    {
      label: "BARRICADE/HAZARD TAPES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BARRICADE-HAZARD-TAPES",
    },
    {
      label: "BOLLARDS",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=BOLLARDS",
    },
    {
      label: "TRAFFIC CONES",
      type: 3,
      link: SS_ACCESSORIES + "&childCategoryName=TRAFFIC-CONES",
    },
  ];
  //#endregion

  /* HAND TOOLS */
  var HAND_TOOLS = "/product-list?categoryName=HAND-TOOLS";
  // #region
  var HAND_TOOLS_1 = [
    {
      label: "FASTENING KITS",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=FASTENING-KITS",
    },
    {
      label: "SOFT STORAGE",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=SOFT-STORAGE",
    },
    {
      label: "HARD STORAGE",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=HARD-STORAGE",
    },

    {
      label: "LAYOUT",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=LAYOUT",
    },
    {
      label: "PIPE TOOLS WRENCHES",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=PIPE-TOOLS-WRENCHES",
    },
    {
      label: "STRIKING DEMOLITION",
      type: 2,
      link: HAND_TOOLS + "&subCategoryName=STRIKING-DEMOLITION",
    },

  ];

  var HAND_TOOLS_CUTTINGTOOLS = HAND_TOOLS + "&subCategoryName=CUTTING-TOOLS";
  var HAND_TOOLS_CUTTINGTOOLS_SUB = [
    { label: "CUTTING TOOLS", type: 2, link: HAND_TOOLS_CUTTINGTOOLS },
    {
      label: "CABLE CUTTERS",
      type: 3,
      link: HAND_TOOLS_CUTTINGTOOLS + "&childCategoryName=CABLE-CUTTERS",
    },
    {
      label: "SNIPS & SHEARS",
      type: 3,
      link: HAND_TOOLS_CUTTINGTOOLS + "&childCategoryName=SNIPS-SHEARS",
    },
  ];

  var HAND_TOOLS_FASTENING = HAND_TOOLS + "&subCategoryName=FASTENING";
  var HAND_TOOLS_FASTENING_3 = [
    { label: "FASTENING", type: 2, link: HAND_TOOLS_FASTENING },
    {
      label: "RATCHET PODGERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=RATCHET-PODGERS",
    },
    {
      label: "SLOGGING SPANNERS",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=SLOGGING-SPANNERS",
    },

    {
      label: "WRENCHES",
      type: 3,
      link: HAND_TOOLS_FASTENING + "&childCategoryName=WRENCHES",
    },
  ];
  var HAND_TOOLS_PLIERS = HAND_TOOLS + "&subCategoryName=PLIERS";
  var HAND_TOOLS_PLIERS_3 = [
    { label: "PLIERS", type: 2, link: HAND_TOOLS_PLIERS },
    {
      label: "LONG NOSE PLIER",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=LONG-NOSE-PLIER",
    },
    {
      label: "PLIERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=PLIERS",
    },

    {
      label: "SIDE CUTTERS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=SIDE-CUTTERS",
    },
    {
      label: "STRIPPING TOOLS",
      type: 3,
      link: HAND_TOOLS_PLIERS + "&childCategoryName=STRIPPING-TOOLS",
    },
  ];

  var HAND_TOOLS_KNIVES = HAND_TOOLS + "&subCategoryName=KNIVES";
  var HAND_TOOLS_KNIVES_3 = [
    { label: "KNIVES", type: 2, link: HAND_TOOLS_KNIVES },
    {
      label: "SAFETY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=SAFETY-KNIVES",
    },
    {
      label: "UTILITY KNIVES",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=UTILITY-KNIVES",
    },
    {
      label: "KNIFE",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=KNIFE",

    },
    {
      label: "BLADE REPLACEMENT",
      type: 3,
      link: HAND_TOOLS_KNIVES + "&childCategoryName=BLADE-REPLACEMENT",
    },

  ];

  var HAND_TOOLS_ELECTRICAL = HAND_TOOLS + "&subCategoryName=ELECTRICAL";
  var HAND_TOOLS_ELECTRICAL_SUB = [
    { label: "ELECTRICAL", type: 2, link: HAND_TOOLS_ELECTRICAL },
    {
      label: "CABLE CUTTING",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=CABLE-CUTTING",
    },
    {
      label: "CRIMPERS",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=CRIMPERS",
    },
    {
      label: "SCREW DRIVERS",
      type: 3,
      link: HAND_TOOLS_ELECTRICAL + "&childCategoryName=SCREW-DRIVERS",
    },
  ];

  var HAND_TOOLS_GASTOOLS = HAND_TOOLS + "&subCategoryName=GAS-TOOLS";
  var HAND_TOOLS_GASTOOLS_SUB = {
    label: "GAS TOOLS",
    type: 2,
    link: HAND_TOOLS_GASTOOLS,
  };

  var HAND_TOOLS_MEASURING = HAND_TOOLS + "&subCategoryName=MEASURING";
  var HAND_TOOLS_MEASURING_SUB = {
    label: "MEASURING",
    type: 2,
    link: HAND_TOOLS_MEASURING,
  };
  // #endregion

  /* ELECTRICAL */
  var ELECTRICAL = "/product-list?categoryName=ELECTRICAL";
  // #region
  var ELECTRICAL_LIGHTING = {
    label: "LIGHTING",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=LIGHTING",
  };

  var ELECTRICAL_SWITCH_GEAR = {
    label: "SWITCH GEAR",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=SWITCH-GEAR",
  };
  var ELECTRICAL_SWITCH_GEAR_1 = {
    label: "CIRCUIT PROTECTION",
    type: 3,
    link: ELECTRICAL_SWITCH_GEAR.link + "&childCategoryName=CIRCUIT-PROTECTION",
  };

  var ELECTRICAL_SWITCH_GEAR_2 = [
    {
      label: "CIRCUIT BREAKERS",
      type: 4,
      link: ELECTRICAL_SWITCH_GEAR_1.link + "&fourCategoryName=CIRCUIT-BREAKERS",
    },
    {
      label: "OVERLOADS",
      type: 4,
      link: ELECTRICAL_SWITCH_GEAR_1.link + "&fourCategoryName=OVERLOADS",
    },
    {
      label: "CONTACTORS",
      type: 4,
      link: ELECTRICAL_SWITCH_GEAR_1.link + "&fourCategoryName=CONTACTORS",
    },
    {
      label: "RELAYS",
      type: 4,
      link: ELECTRICAL_SWITCH_GEAR_1.link + "&fourCategoryName=RELAYS",
    }
  ];

  var ELECTRICAL_MOTORS = {
    label: "MOTORS",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=MOTORS",
  };
  var ELECTRICAL_MOTORS_1 = [
    {
      label: "VIBRATING MOTORS",
      type: 3,
      link: ELECTRICAL_MOTORS.link + "&childCategoryName=VIBRATING-MOTORS",
    },
    {
      label: "415V MOTORS",
      type: 3,
      link: ELECTRICAL_MOTORS.link + "&childCategoryName=415V-MOTORS",
    },
  ];

  var ELECTRICAL_BORE_PUMPS = {
    label: "BORE PUMPS",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=BORE-PUMPS",
  };

  var ELECTRICAL_WIRING_ACCESSORIES = {
    label: "WIRING ACCESSORIES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=WIRING-ACCESSORIES",
  };
  var ELECTRICAL_WIRING_ACCESSORIES_1 = [
    {
      label: "PVC CONDUIT FITTINGS",
      type: 3,
      link: ELECTRICAL_WIRING_ACCESSORIES.link + "&childCategoryName=PVC-CONDUIT-FITTINGS",
    },
    {
      label: "CORRUGATED CONDUIT",
      type: 3,
      link: ELECTRICAL_WIRING_ACCESSORIES.link + "&childCategoryName=CORRUGATED-CONDUIT",
    },
  ];

  var ELECTRICAL_CHARGERS = {
    label: "CHARGERS",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CHARGERS",
  };
  var ELECTRICAL_CABLES = {
    label: "CABLES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=CABLES",
  };
  var EC_CONSTRUCTION_CABLES = {
    label: "CONSTRUCTION CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=CONSTRUCTION-CABLES",
  };
  var EC_CC_4 = [
    {
      label: "SINGLE CORE",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SINGLE-CORE",
    },
    {
      label: "SDI 16MM",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=SDI-16MM",
    },
    {
      label: "FLAT",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT",
    },
    {
      label: "FLAT 3 CORES",
      type: 4,
      link: EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=FLAT-3-CORES",
    },
    {
      label: "ORANGE CIRCULAR POWER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link + "&fourCategoryName=ORANGE-CIRCULAR-POWER",
    },
    {
      label: "XLPE SINGLE CORE, COPPERCONDUCTOR(CU)",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-SINGLE-CORE-COPPERCONDUCTOR",
    },
    {
      label: "XLPE MULTI CORE COPPER",
      type: 4,
      link:
        EC_CONSTRUCTION_CABLES.link +
        "&fourCategoryName=XLPE-MULTI-CORE-COPPER",
    },
  ];

  var EC_INDUSTRIAL_CABLES = {
    label: "INDUSTRIAL CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=INDUSTRIAL-CABLES",
  };
  var EC_IC_4 = [
    {
      label: "FLEXIBLE CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=FLEXIBLE-CABLES",
    },
    {
      label: "WSD CABLES",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=WSD-CABLES",
    },
    {
      label: "STEEL WIRE AMOURED",
      type: 4,
      link: EC_INDUSTRIAL_CABLES.link + "&fourCategoryName=STEEL-WIRE-AMOURED",
    },
  ];

  var EC_MINING_CABLES = {
    label: "MINING CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=MINING-CABLES",
  };
  var EC_MC_4 = [
    {
      label: "DETONATOR CABLES",
      type: 4,
      link: EC_MINING_CABLES.link + "&fourCategoryName=DETONATOR-CABLES",
    },
  ];

  var EC_SPECIALITY_CABLES = {
    label: "SPECIALITY CABLES",
    type: 3,
    link: ELECTRICAL_CABLES.link + "&childCategoryName=SPECIALITY-CABLES",
  };
  var EC_SC_4 = [
    {
      label: "SOLAR CABLE - SINGLE OR TWINCORES",
      type: 4,
      link:
        EC_SPECIALITY_CABLES.link +
        "&fourCategoryName=SOLAR-CABLE-SINGLE-OR-TWINCORES",
    },
  ];

  var ELECTRICAL_ENCLOSURES = {
    label: "ENCLOSURES",
    type: 2,
    link: ELECTRICAL + "&subCategoryName=ENCLOSURES",
  };
  var EE_WALL_MOUNTED = {
    label: "WALL MOUNTED",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=WALL-MOUNTED",
  };
  var EE_WM_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ALUMINIUM",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=ALUMINIUM",
    },
    {
      label: "GRP",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=GRP",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_WALL_MOUNTED.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_SLOPING_ROOF = {
    label: "SLOPING ROOF",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=SLOPING-ROOF",
  };
  var EE_SR_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEELHD",
    },
    {
      label: "STAINLESS STEELHD",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STAINLESS-STEELHD",
    },
    {
      label: "STEEL WITH SUN SHIELDS",
      type: 4,
      link: EE_SLOPING_ROOF.link + "&fourCategoryName=STEEL-WITH-SUN-SHIELDS",
    },
  ];

  var EE_FLOOR_STANDING = {
    label: "FLOOR STANDING",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=FLOOR-STANDING",
  };
  var EE_FS_4 = [
    {
      label: "STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STEEL",
    },
    {
      label: "STAINLESS STEEL",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=STAINLESS-STEEL",
    },
    {
      label: "ACCESSORIES",
      type: 4,
      link: EE_FLOOR_STANDING.link + "&fourCategoryName=ACCESSORIES",
    },
  ];

  var EE_PVC_ADAPTABLE_BOXES = {
    label: "PVC ADAPTABLE BOXES",
    type: 3,
    link: ELECTRICAL_ENCLOSURES.link + "&childCategoryName=PVC-ADAPTABLE-BOXES",
  };


  /* LABORATORY */
  var LABORATORY = "/product-list?categoryName=LABORATORY";
  // #region
  var LABORATORY_1 = [
    {
      label: "LAB EQUIPMENT",
      type: 2,
      link: LABORATORY + "&subCategoryName=LAB-EQUIPMENT",
    },
  ];
  var LABORATORY_2 = [
    {
      label: "LAB CHEMICALS",
      type: 2,
      link: LABORATORY + "&subCategoryName=LAB-CHEMICALS",
    },
  ];

  //#endregion

  /* INDUSTRIAL */
  var INDUSTRIAL = "/product-list?categoryName=INDUSTRIAL";
  // #region
  var INDUSTRIAL_ABRASIVES_CUTTING =
    INDUSTRIAL + "&subCategoryName=ABRASIVES-CUTTING";
  var INDUSTRIAL_1 = [
    {
      label: "ABRASIVES & CUTTING",
      type: 2,
      link: INDUSTRIAL_ABRASIVES_CUTTING,
    },
    {
      label: "BELTS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BELTS",
    },
    {
      label: "DISCS",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=DISCS",
    },
    {
      label: "BONDED",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BONDED",
    },
    {
      label: "BRUSHES",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=BRUSHES",
    },
    {
      label: "POLISHING & FINISHING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=POLISHING-FINISHING",
    },
    {
      label: "SANDING",
      type: 3,
      link: INDUSTRIAL_ABRASIVES_CUTTING + "&childCategoryName=SANDING",
    },
    {
      label: "SURFACE CONDITIONING",
      type: 3,
      link:
        INDUSTRIAL_ABRASIVES_CUTTING +
        "&childCategoryName=SURFACE-CONDITIONING",
    },
  ];
  var INDUSTRIAL_DRILLING = INDUSTRIAL + "&subCategoryName=DRILLING";
  var INDUSTRIAL_2 = [
    { label: "DRILLING", type: 2, link: INDUSTRIAL_DRILLING },
    {
      label: "DRILL BITS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-BITS",
    },
    {
      label: "DRILL SETS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=DRILL-SETS",
    },
    {
      label: "TCT HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLESAWS",
    },
    {
      label: "TCT HOLE CUTTER",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=TCT-HOLE-CUTTER",
    },
    {
      label: "ARBORS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=ARBORS",
    },
    {
      label: "HSS HOLESAWS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-HOLESAWS",
    },
    {
      label: "HSS BROACH CUTTERS",
      type: 3,
      link: INDUSTRIAL_DRILLING + "&childCategoryName=HSS-BROACH-CUTTERS",
    },
  ];
  var INDUSTRIAL_LUBRICATION_EQUIPMENT =
    INDUSTRIAL + "&subCategoryName=LUBRICATION-EQUIPMENT";
  var INDUSTRIAL_3 = [
    {
      label: "LUBRICATION & EQUIPMENT",
      type: 2,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT,
    },
    {
      label: "GENERAL",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GENERAL",
    },
    {
      label: "ANTI-SIEZE",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=ANTI-SIEZE",
    },
    {
      label: "CLEANERS & DISPERSANTS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT +
        "&childCategoryName=CLEANERS-DISPERSANTS",
    },
    {
      label: "CUTTING FLUIDS",
      type: 3,
      link:
        INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=CUTTING-FLUIDS",
    },
    {
      label: "GREASES",
      type: 3,
      link: INDUSTRIAL_LUBRICATION_EQUIPMENT + "&childCategoryName=GREASES",
    },
  ];
  var INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES =
    INDUSTRIAL + "&subCategoryName=PAINT-EQUIPMENT-SUPPLIES";
  var INDUSTRIAL_4 = [
    {
      label: "PAINT,EQUIPMENT & SUPPLIES",
      type: 2,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES,
    },
    {
      label: "MARKING PAINT",
      type: 3,
      link:
        INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES +
        "&childCategoryName=MARKING-PAINT",
    },
    {
      label: "PAINT",
      type: 3,
      link:
        INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=PAINT",
    },
    {
      label: "AEROSOLS",
      type: 3,
      link: INDUSTRIAL_PAINT_EQUIPMENT_SUPPLIES + "&childCategoryName=AEROSOLS",
    },
  ];
  var INDUSTRIAL_PUMPS_VALVES_PARTS =
    INDUSTRIAL + "&subCategoryName=PUMPS-VALVES-PARTS";
  var INDUSTRIAL_5 = [
    {
      label: "PUMPS,VALVES & PARTS",
      type: 2,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS,
    },
    {
      label: "FITTINGS & PARTS",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=FITTINGS-PARTS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_PUMPS_VALVES_PARTS + "&childCategoryName=VALVES",
    },
  ];
  var INDUSTRIAL_HOSES_FITTINGS =
    INDUSTRIAL + "&subCategoryName=HOSES-FITTINGS";
  var INDUSTRIAL_6 = [
    { label: "HOSES & FITTINGS", type: 2, link: INDUSTRIAL_HOSES_FITTINGS },
    {
      label: "AIR & WATER HOSE",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-WATER-HOSE",
    },
    {
      label: "AIR LINE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=AIR-LINE-FITTINGS",
    },
    {
      label: "HOSE CLAMPS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-CLAMPS",
    },
    {
      label: "HOSE FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-FITTINGS",
    },
    {
      label: "HOSE REELS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=HOSE-REELS",
    },
    {
      label: "VALVES",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=VALVES",
    },
    {
      label: "THREADED FITTINGS",
      type: 3,
      link: INDUSTRIAL_HOSES_FITTINGS + "&childCategoryName=THREADED-FITTINGS",
    },
  ];
  var INDUSTRIAL_PIPE_REPAIR =
    INDUSTRIAL + "&subCategoryName=PIPE-REPAIR";
  var INDUSTRIAL_7 = [
    { label: "PIPE REPAIR", type: 2, link: INDUSTRIAL_PIPE_REPAIR },

  ];
  var INDUSTRIAL_FASTENERS = INDUSTRIAL + "&subCategoryName=FASTENERS";
  var INDUSTRIAL_8 = [
    { label: "FASTENERS", type: 2, link: INDUSTRIAL_FASTENERS },
    {
      label: "BOLTS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=BOLTS",
    },
    {
      label: "NUTS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=NUTS",
    },
    {
      label: "SCREWS",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=SCREWS",
    },
    {
      label: "WASHER FLAT",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=WASHER-FLAT",
    },
    {
      label: "WASHER SPRING",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=WASHER-SPRING",
    },
    {
      label: "ROD",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=ROD-THREADED",
    },
    {
      label: "STUD CHEMSET",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=STUD-CHEMSET",
    },
    {
      label: "HARDWARE",
      type: 3,
      link: INDUSTRIAL_FASTENERS + "&childCategoryName=HARDWARE",
    },
  ];
  //#endregion

  // console.log(EC_CONSTRUCTION_CABLES);

  return (
    <Navbar collapseOnSelect className="nav_bgc w-100" expand="lg">
      <Container className="w-100 navb" fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="w-100">
          {/* ************   Mega Menu  ***************  */}
          <Nav className="w3c_nav">

            {/* PPE */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={PPE}>PPE</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {PPE_HEADWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {PPE_HEARING3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HYDRATION3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_EYE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_RESPIRATORY3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_HAND3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>

                  <ul className="column">
                    {PPE_WORKWEAR3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_SUN3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_FACE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PPE_DISPOSABLE3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* SITE SAFETY */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={SITE_SAFETY}>SITE SAFETY</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {SS_SPILL_KITS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_FIRST_AID3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {SS_SPILL_CONTAINMENT3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_ACCESSORIES3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {SS_SHORES_EYEWASH3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {SS_DG_CABINETS3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* POWER AIR */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={POWER_AIR}>POWER/AIR</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {POWER_AIR_POWER_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {POWER_AIR_AIR_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {POWER_AIR_GENERATORS_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* HAND TOOLS */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={HAND_TOOLS}>HAND TOOLS</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">

                    {HAND_TOOLS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {HAND_TOOLS_CUTTINGTOOLS_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_FASTENING_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_ELECTRICAL_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {HAND_TOOLS_PLIERS_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {HAND_TOOLS_KNIVES_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    <li className="subCat">
                      <a href={HAND_TOOLS_GASTOOLS_SUB.link}>
                        {HAND_TOOLS_GASTOOLS_SUB.label}
                      </a>
                    </li>
                    <li className="subCat">
                      <a href={HAND_TOOLS_MEASURING_SUB.link}>
                        {HAND_TOOLS_MEASURING_SUB.label}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* INDUSTRIAL*/}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={INDUSTRIAL}>INDUSTRIAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {INDUSTRIAL_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {INDUSTRIAL_3.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_4.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {INDUSTRIAL_2.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_8.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">

                    {INDUSTRIAL_5.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_6.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    {INDUSTRIAL_7.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* FABRICATION*/}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={FABRICATION}>FABRICATION</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {FABRICATION_WELD_HEAT_CUT_BRAZE_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FABRICATION_MIG_FLUX_CORED_WELDING_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {FABRICATION_TIG_STICK_MMA_WELDING_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            {/* ELECTRICAL */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={ELECTRICAL}>ELECTRICAL</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {/* CABLES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_CABLES.link}>
                        {ELECTRICAL_CABLES.label}
                      </a>
                    </li>
                    <li className="parent childCat">
                      <a className="parentA" href={EC_CONSTRUCTION_CABLES.link}>
                        {EC_CONSTRUCTION_CABLES.label}
                        <span className="expand ms-1"> »</span>
                      </a>
                      <ul className="child">
                        {EC_CC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_INDUSTRIAL_CABLES.link}>
                        {EC_INDUSTRIAL_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_IC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_MINING_CABLES.link}>
                        {EC_MINING_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_MC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EC_SPECIALITY_CABLES.link}>
                        {EC_SPECIALITY_CABLES.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EC_SC_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="subCat">
                      <a href={ELECTRICAL_SWITCH_GEAR.link}>
                        {ELECTRICAL_SWITCH_GEAR.label}
                      </a>
                    </li>
                    <li className="parent childCat">
                      <a className="parentA" href={ELECTRICAL_SWITCH_GEAR_1.link}>
                        {ELECTRICAL_SWITCH_GEAR_1.label}
                        <span className="expand ms-1"> »</span>
                      </a>
                      <ul className="child">
                        {ELECTRICAL_SWITCH_GEAR_2.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>

                  <ul className="column">
                    {/* ENCLOSURES */}
                    <li className="subCat">
                      <a href={ELECTRICAL_ENCLOSURES.link}>
                        {ELECTRICAL_ENCLOSURES.label}
                      </a>
                    </li>
                    <li>
                      <a className="parentA" href={EE_PVC_ADAPTABLE_BOXES.link}>
                        {EE_PVC_ADAPTABLE_BOXES.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_WALL_MOUNTED.link}>
                        {EE_WALL_MOUNTED.label}
                        <span className="expand ms-1"> »</span>
                      </a>
                      <ul className="child">
                        {EE_WM_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_SLOPING_ROOF.link}>
                        {EE_SLOPING_ROOF.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EE_SR_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>

                    <li className="parent childCat">
                      <a className="parentA" href={EE_FLOOR_STANDING.link}>
                        {EE_FLOOR_STANDING.label}
                        <span className="expand ms-1">»</span>
                      </a>
                      <ul className="child">
                        {EE_FS_4.map((item) => {
                          return (
                            <li
                              key={item.link}
                              className={nav_color[item.type]}
                            >
                              <a href={item.link}>{item.label} </a>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_LIGHTING.link}>
                        {ELECTRICAL_LIGHTING.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    <li className="subCat">
                      <a
                        className="parentA"
                        href={ELECTRICAL_CHARGERS.link}
                      >
                        {ELECTRICAL_CHARGERS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                  </ul>

                  <ul className="column">

                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_MOTORS.link}>
                        {ELECTRICAL_MOTORS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    {ELECTRICAL_MOTORS_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_BORE_PUMPS.link}>
                        {ELECTRICAL_BORE_PUMPS.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>


                    <li className="subCat">
                      <a className="parentA" href={ELECTRICAL_WIRING_ACCESSORIES.link}>
                        {ELECTRICAL_WIRING_ACCESSORIES.label}
                        {/* <span className="expand ms-2"> »</span> */}
                      </a>
                    </li>
                    {ELECTRICAL_WIRING_ACCESSORIES_1.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}

                  </ul>
                </div>
              </div>
            </div>

            {/* PROCESSING */}
            <div className="w3c_dropdown">
              <div className="dropbtn">
                <a href={PROCESSING}>PROCESSING</a>
              </div>
              <div className="dropdown-content">
                <div className="row">
                  <ul className="column">
                    {PROCESSING_LAB_CHEMICALS.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                    {PROCESSING_LAB_EQUIPMENTS.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {PROCESSING_GRINDING_MEDIA.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="column">
                    {PROCESSING_REAGENTS_SUB.map((item) => {
                      return (
                        <li key={item.link} className={nav_color[item.type]}>
                          <a href={item.link}>{item.label} </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

            </div>
            {/* BRANDS */}
            {/*             <div className="w3c_dropdown">
              <div className="dropbtn">
                BRANDS
              </div>
              <div className="dropdown-content-brand">
                {BRANDS.map((item) => {
                  return (
                    <div className="img_hvf">
                      <a key={item.link} href={item.link}>
                        <img
                          className="brand_img"
                          src={item.Brand_Logo}
                          alt=""
                        />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navb;
