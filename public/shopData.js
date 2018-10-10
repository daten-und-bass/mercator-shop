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
          "en":  "Master Max",
          "de":  "Meister Max"
        },
        "locales": ["de", "en"],
        "description": {
          "en": "Anglia, Anglia ...Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros.",
          "de": "Germania, Germania ...Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros."
        },
        "delivery": {
          "information_request": {
            "type": "information_request"
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
              "street": "Müllerweg",
              "number": "2",
              "address_extra_line": "Im Hinterhof",
              "postcode": "33333",
              "city": "Hausen",
              "country": "DE",
              // "times": [10,12, 34,36]
              "times": [ "Mo: 10:00-12:00h", "Di: 10:00-12:00h"]
            }, {
              "_id": 1,
              "street": "Hahnekamm",
              "number": "6",
              "address_extra_line": "Auf dem Wochenmarkt",
              "postcode": "12345",
              "city": "Dorfigo",
              "country": "DE",
              // "times": [34,36, 106,110]
              "times": [ "Di: 10:00-12:00h", "Do: 10:00-12:00h" ]
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
              "fees": 6,
              "free": {
                "money_based": 100.00,
                "volume_based": 15,
                "optimal_volume": 12
              },
            }, {
              "type": "express",
              "fees": 15,
              "free": {
                "money_based": 200.00,
                "volume_based": 20,
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
        "logo_link": "https://meister-max.de/images/logo.png",
        "first_name": 'Peter',
        "last_name": 'Max',
        "street": "Müllerweg",
        "number": "2",
        "address_extra_line": "Im Hinterhof",
        "postcode": "33333",
        "city": "Hausen",
        "country": "DE",
        "phone": "0049123456",
        "fax": "0049498765",
        "email": "max@web898-8.de",
        "homepage": "https://meister-max.de",
        "latitude": 54.787025,
        "longitude": 8.824650,
        "products": [
          {"_id": 0, "title": {"en": "iPad 4 Mini", "de": "iPad 4 Mini"}, "price": 500.0187655, "inventory": true, src: [`${mercator.config().base_url}ipad.jpg`, `${mercator.config().base_url}ipad_2.jpg`, `${mercator.config().base_url}ipad_3.jpg` ], "vat": {"de": 2}, categories: ["electronics", "tablet"], "description": {"en": "Anglia, Anglia ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros. Nam feugiat, purus et ultrices pellentesque, leo sem accumsan ex, nec elementum ex nulla nec nunc. Sed id ullamcorper nunc. Pellentesque non nunc mauris. Mauris sodales.", "de": "Germania, Germania ...Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris tristique, sapien non viverra finibus, urna nulla porttitor tellus, ac accumsan mi sapien ac eros. Nam feugiat, purus et ultrices pellentesque, leo sem accumsan ex, nec elementum ex nulla nec nunc. Sed id ullamcorper nunc. Pellentesque non nunc mauris. Mauris sodales."}},
          {"_id": 1, "title": {"en": "Ben Sherman Shirt (checked)", "de": "Ben Sherman Hemd (kariert)"}, "price": 39.99, "inventory": true, src: [`${mercator.config().base_url}bnshm.jpg`], "vat": {"de": 2}, categories: [""], "description": {"en": "Anglia, Anglia ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et.", "de": "Germania, Germania ...Praesent nulla mauris, tempor quis malesuada ac, sagittis vitae ipsum. Pellentesque vel ultrices purus. Mauris iaculis urna sed sem cursus, nec hendrerit orci congue. Duis euismod imperdiet justo vel bibendum. In hac habitasse platea dictumst. Nam lobortis suscipit neque vel semper. Fusce dolor nunc, sagittis vitae fermentum at, cursus et."}},
          {"_id": 2, "title": {"en": "A Tribe Called Quest - Midnight Marauders", "de": "A Tribe Called Quest - Midnight Marauders" }, "price": 19.99, "inventory": true, src: [`${mercator.config().base_url}ATCQ.png`], "vat": {"de": 1}, categories: ["music"], "description": {"en": "Anglia, Anglia ...Proin viverra enim arcu, sed posuere nunc porttitor nec. Cras suscipit quis ante quis condimentum. Nulla tempus tincidunt eros nec placerat. Cras eget placerat nibh. Suspendisse suscipit neque neque, ut rutrum urna fringilla et. Quisque imperdiet metus a scelerisque molestie. Aliquam sit amet lectus porta, pharetra ante id, fringilla odio. Praesent at odio at purus efficitur tristique sed id nisi. Duis ut lectus urna. Quisque a laoreet diam. Cras felis erat, viverra at porta vel, porta id nulla. Cras tristique.", "de": "Germania, Germania ...Proin viverra enim arcu, sed posuere nunc porttitor nec. Cras suscipit quis ante quis condimentum. Nulla tempus tincidunt eros nec placerat. Cras eget placerat nibh. Suspendisse suscipit neque neque, ut rutrum urna fringilla et. Quisque imperdiet metus a scelerisque molestie. Aliquam sit amet lectus porta, pharetra ante id, fringilla odio. Praesent at odio at purus efficitur tristique sed id nisi. Duis ut lectus urna. Quisque a laoreet diam. Cras felis erat, viverra at porta vel, porta id nulla. Cras tristique."}},
          {"_id": 3, "title": {"en": "Nokia 6 - Mobile", "de": "Nokia 6 - Handy"}, "price": 150.00, "inventory": false, src: [`${mercator.config().base_url}nokia.jpg`], "vat": {"de": 2}, categories: [], "description": {"en": "Anglia, Anglia ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna.", "de": "Germania, Germania ...Proin eu leo ex. Sed venenatis ante ut nunc mollis tincidunt. Curabitur finibus pellentesque placerat. Praesent interdum, urna."}},
          {"_id": 4, "title": {"en": "Espresso Maker Mokka", "de": "Espressokocher Mokka"}, "price": 20.99, "inventory": true, src: [`${mercator.config().base_url}Bialetti.jpg`], "vat": {"de": 0}, categories: ["home", "hot beverages", "coffee machines", "coffee"], "description": {"en": "Anglia, Anglia ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem.", "de": "Germania, Germania ...Ut euismod ornare ante, sed placerat massa sodales eleifend. Etiam a elementum leo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse pulvinar turpis sapien, eu tincidunt ligula suscipit vel. Etiam tristique lorem."}},
          {"_id": 5, "title": {"en": "Onko Coffee - Gold", "de": "Onko Kaffe - Gold"}, "price": 4.99, "inventory": true, src: [`${mercator.config().base_url}onko.jpg`], "vat": {"de": 1}, categories: ["food&drinks", "coffee", "coffee beans"], "description": {"en": "Anglia, Anglia ...Fusce fringilla nec ex ut.", "de": "Germania, Germania ...Fusce fringilla nec ex ut."}}
        ],
        "categories": {
          "electronics": { "en": "electronics", "de": "Elektronik"},
          "tablet": { "en": "tablet", "de": "Tablet"},
          "music": { "en": "music", "de": "Musik"},
          "home": { "en": "home", "de": "Home"},
          "hot beverages": { "en": "hot beverages", "de": "Heißgetränke"},
          "coffee machines": { "en": "coffee machines", "de": "Kaffeemaschinen"},
          "coffee": { "en": "coffee", "de": "Kaffee"},
          "food&drinks": { "en": "food&drinks", "de": "Essen&Trinken"},
          "coffee beans": { "en": "coffee beans", "de": "Kaffeebohnen"}
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

