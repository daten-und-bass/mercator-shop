'use strict'

const mercator = {
  config () {
    return {
      "base_url": "/stage/mercator-shop/",
    };
  },
  data () {
    return {
      "_order_types": ["information_request", "pickup", "shipping_postal"],
      "_address_types": ["pickup_address", "orderer_address", "shipping_address"],
      "vat": {
        // ToDo: When which VAT to take (not only dependent on locale)?
        //  => Basic principle: Country of shop is decisive
        //    => Exception: Electronic goods (then buyer country is decisive, but only in B2C (not in B2B)
        // In Germany there is also the socalled "Mischsatz" .. but only very rarely?
        "de": [0.00, 0.07 , 0.19],
      },
      "shops": [{
        "_id": 0,
        "shop_name": {
          "en":  "Winer",
          "de":  "Weiner"
        },
        "locales": ["de", "en"],
        "description": {
          "en": "Estate Wines, Sparkling Wines and more from Rheinhessen.",
          "de": "Weine direkt vom Winzer, Sekt und Secco und noch mehr aus Rheinhessen."
        },
        "delivery": {
          "information_request": {
            "type": "information_request",
            "description": {
              "en": "A request on product information without obligation.",
              "de": "Eine unverbindliche Anfrage zu Produktinformationen."
            },
            "payment_methods": []
          },
          "pickup": {
            "type": "pickup",
            "payment_methods": [{
              "payment_method": "prepayment",
              "customer_type": "all"
            }, {
              "payment_method": "cash",
              "customer_type": "all"
            }, {
              "payment_method": "on_account",
              "customer_type": "existing_only"
            }],
            "addresses": [{
              "_id": 0,
              "street": "Talblick",
              "number": "25",
              "address_extra_line": "",
              "postcode": "54321",
              "city": "Weinhausen",
              "country": "DE",
              // "times": [10,12, 34,36]
              "times": [ "Mo: 10:00-12:00h", "Di: 10:00-12:00h", "Mi: 10:00-12:00h", "Do: 08:00-18:00h"]
            }]
          },
          "shipping_postal": {
            "type": "shipping_postal",
            "payment_methods": [{
              "payment_method": "prepayment",
              "customer_type": "all"
            }, {
              "payment_method": "on_account",
              "customer_type": "existing_only"
            }],
            "methods": [{
              "type": "standard",
              "name": {
                "en": "Standard",
                "de": "Standard"
              },
              "description":{
                "en": "Standard shipping via DHL.",
                "de": "Standardversand mit DHL."              
              },
              "fees": 8,
              "free": {
                "money_based": 100.00,
                "volume_based": 18,
                "optimal_volume": 18
              },
            }, {
              "type": "express",
              "name": {
                "en": "Express",
                "de": "Express"
              },
              "description":{
                "en": "Express shipping via DHL.",
                "de": "Expressversand mit DHL."           
              },
              "fees": 20,
              "free": {
                "money_based": 300.00,
                "volume_based": 36,
                "optimal_volume": 18
              },
            }]
          }
        },
        "payment": {
          "prepayment": {
            "type": "prepayment",
            "name": {
              "en": "Prepayment",
              "de": "Vorkasse"
            },
            "description": {
              "en": "Payment in advance via bank transfer.",
              "de": "Zahlung vorab per Banküberweisung."
            }
          }, 
          "cash": {
            "type": "cash",
            "name": {
              "en": "Cash",
              "de": "Bar"
            },
            "description": {
              "en": "Payment in cash at pickup on-site.",
              "de": "Zahlung in bar bei Abholung vor Ort."
            }
          }, 
          "on_account": {
            "type": "on_account",
            "name": {
              "en": "On Account",
              "de": "Rechnung"
            },
            "description": {
              "en": "Payment afterwards via bank transfer.",
              "de": "Zahlung im Nachhinein per Banküberweisung."
            },
          }
        },
        "logo_link": "https://weingut-weiner-weinhausen.de/images/logo.png",
        "first_name": 'Hans',
        "last_name": 'Müller',
        "street": "Talblick",
        "number": "25",
        "address_extra_line": "",
        "postcode": "54321",
        "city": "Weinhausen",
        "country": "DE",
        "phone": "0049123456",
        "fax": "0049498765",
        "email": "info@weingut-weiner-weinhausen.de",
        "homepage": "https://weingut-weiner-weinhausen.de",
        "latitude": 53.787025,
        "longitude": 8.424650,
        "products": [
          {"_id": 0, "title": {"en": "Riesling Dry", "de": "Riesling trocken"}, "price": 7.50, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.001.png`, `${mercator.config().base_url}/Weiner/Weiner.002.png`], "vat": {"de": 2}, categories: ["white", "dry"], "description": {"en": "Anglia, Anglia ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros. Nam feugiat, purus et ultrices pellentesque, leo sem accumsan ex, nec elementum ex nulla nec nunc. Sed id ullamcorper nunc. Pellentesque non nunc mauris. Mauris sodales.", "de": "Germania, Germania ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros. Nam feugiat, purus et ultrices pellentesque, leo sem accumsan ex, nec elementum ex nulla nec nunc. Sed id ullamcorper nunc. Pellentesque non nunc mauris. Mauris sodales."}},
          {"_id": 1, "title": {"en": "Grauburgunder Semi-Dry", "de": "Grauburgunder halbtrocken"}, "price": 6.00, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.003.png`], "vat": {"de": 2}, categories: ["white", "semi_dry"], "description": {"en": "Anglia, Anglia ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et.", "de": "Germania, Germania ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et."}},
          {"_id": 2, "title": {"en": "Müller-Thurgau QBA", "de": "Müller-Thurgau QBA"}, "price": 4.50, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.004.png`], "vat": {"de": 2}, categories: ["white", "dry", "liter_wines"], "description": {"en": "Anglia, Anglia ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et.", "de": "Germania, Germania ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et."}},
          {"_id": 3, "title": {"en": "Riesling Roter Schiefer", "de": "Riesling Roter Schiefer"}, "price": 9.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.005.png`], "vat": {"de": 2}, categories: ["white", "dry", "hand-crafted"], "description": {"en": "Anglia, Anglia ...Proin viverra enim arcu, sed posuere nunc porttitor nec. Cras suscipit quis ante quis condimentum. Nulla tempus tincidunt eros nec placerat. Cras eget placerat nibh. Suspendisse suscipit neque neque, ut rutrum urna fringilla et. Quisque imperdiet metus a scelerisque molestie. Aliquam sit amet lectus porta, pharetra ante id, fringilla odio. Praesent at odio at purus efficitur tristique sed id nisi. Duis ut lectus urna. Quisque a laoreet diam. Cras felis erat, viverra at porta vel, porta id nulla. Cras tristique.", "de": "Germania, Germania ...Proin viverra enim arcu, sed posuere nunc porttitor nec. Cras suscipit quis ante quis condimentum. Nulla tempus tincidunt eros nec placerat. Cras eget placerat nibh. Suspendisse suscipit neque neque, ut rutrum urna fringilla et. Quisque imperdiet metus a scelerisque molestie. Aliquam sit amet lectus porta, pharetra ante id, fringilla odio. Praesent at odio at purus efficitur tristique sed id nisi. Duis ut lectus urna. Quisque a laoreet diam. Cras felis erat, viverra at porta vel, porta id nulla. Cras tristique."}},
          {"_id": 4, "title": {"en": "Pinot Noir Dry", "de": "Pinot Noir trocken"}, "price": 8.00, "inventory": false, src: [`${mercator.config().base_url}/Weiner/Weiner.006.png`], "vat": {"de": 2}, categories: ["red", "dry"], "description": {"en": "Anglia, Anglia ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna.", "de": "Germania, Germania ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna."}},
          {"_id": 5, "title": {"en": "Merlot Semi-Dry", "de": "Merlot halbtrocken"}, "price": 7.00, "inventory": false, src: [`${mercator.config().base_url}/Weiner/Weiner.007.png`], "vat": {"de": 2}, categories: ["red", "semi_dry"], "description": {"en": "Anglia, Anglia ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna.", "de": "Germania, Germania ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna."}},
          {"_id": 6, "title": {"en": "Dornfelder Barrique", "de": "Dornfelder Barrique"}, "price": 9.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.008.png`], "vat": {"de": 2}, categories: ["red", "dry", "hand-crafted"], "description": {"en": "Anglia, Anglia ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem.", "de": "Germania, Germania ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem."}},
          {"_id": 7, "title": {"en": "Winzersekt Brut", "de": "Winzersekt brut"}, "price": 8.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.009.png`], "vat": {"de": 2}, categories: ["white", "dry", "sparkling"], "description": {"en": "Anglia, Anglia ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem.", "de": "Germania, Germania ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem."}},
          {"_id": 8, "title": {"en": "Prosecco semi-dry", "de": "Prosecco halbtrocken"}, "price": 6.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.010.png`], "vat": {"de": 2}, categories: ["white", "semi_dry", "sparkling"], "description": {"en": "Anglia, Anglia ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem.", "de": "Germania, Germania ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem."}},
          {"_id": 9, "title": {"en": "Sekt Rosé semi-dry", "de": "Sekt Rosé halbtrocken"}, "price": 7.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.011.png`], "vat": {"de": 2}, categories: ["rose", "semi_dry", "sparkling"], "description": {"en": "Anglia, Anglia ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem.", "de": "Germania, Germania ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem."}},
          {"_id": 10, "title": {"en": "Grape Juice - White", "de": "Traubensaft - Weiß"}, "price": 3.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.012.png`], "vat": {"de": 1}, categories: ["juice", "white"], "description": {"en": "Anglia, Anglia ...Fusce fringilla nec ex ut.", "de": "Germania, Germania ...Fusce fringilla nec ex ut."}},
          {"_id": 12, "title": {"en": "Grape Juice - Red", "de": "Traubensaft - Rot"}, "price": 3.99, "inventory": true, src: [`${mercator.config().base_url}/Weiner/Weiner.013.png`], "vat": {"de": 1}, categories: ["juice", "red"], "description": {"en": "Anglia, Anglia ...Fusce fringilla nec ex ut.", "de": "Germania, Germania ...Fusce fringilla nec ex ut."}},
          {"_id": 13, "title": {"en": "Brandy", "de": "Weinbrand"}, "price": 35.00, "inventory": false, src: [`${mercator.config().base_url}/Weiner/Weiner.014.png`], "vat": {"de": 2}, categories: ["liquor"], "description": {"en": "Anglia, Anglia ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna.", "de": "Germania, Germania ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna."}},
        ],
        "categories": {
          "red": { "en": "red", "de": "Rot"},
          "rose": { "en": "rose", "de": "Rosé"},
          "white": { "en": "white", "de": "Weiß"},
          "sparkling": { "en": "sparkling wine", "de": "Sekt"},
          "liquor": { "en": "liquor", "de": "Schnaps"},
          "juice": { "en": "juice", "de": "Saft"},
          "dry": { "en": "dry", "de": "trocken"},
          "semi_dry": { "en": "semi-dry", "de": "halbtrocken"},
          "sweet": { "en": "sweet", "de": "lieblich"},
          "hand-crafted": { "en": "hand-crafted", "de": "handverlesen"},
          "liter_wines": { "en": "liter wines", "de": "Literweine"}
        }
      }],
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mercator_config: mercator.config(),
    mercator_data: mercator.data(),
  }
} else {
  window.__mercator_config__ = mercator.config();
  window.__mercator_data__ = mercator.data();
}

