// scripts/seedAllData.ts
import { config } from "dotenv";
import path from "path";

const envPaths = [".env.local", ".env"];
envPaths.forEach((envPath) => {
  try {
    config({ path: path.resolve(process.cwd(), envPath) });
  } catch (error) {}
});

import { getPayload } from "payload";
import payloadConfig from "../../payload.config";

async function seedAllData() {
  if (!process.env.PAYLOAD_SECRET || !process.env.DATABASE_URL) {
    console.error("❌ Environment variables required");
    process.exit(1);
  }

  const payload = await getPayload({ config: payloadConfig });

  try {
    // 1. Countries
    console.log("🏳️ Seeding countries...");
    const countries = [
      {
        name: "United Kingdom",
        code: "uk",
        flag: "🇬🇧",
        currency: { code: "GBP", symbol: "£" },
        isActive: true,
      },
      {
        name: "Ireland",
        code: "ie",
        flag: "🇮🇪",
        currency: { code: "EUR", symbol: "€" },
        isActive: true,
      },
    ];

    const createdCountries = [];
    for (const country of countries) {
      const created = await payload.create({
        collection: "countries",
        data: country as any,
      });
      createdCountries.push(created);
      console.log(`✅ Created country: ${country.name}`);
    }

    // 2. Cities
    console.log("🏙️ Seeding cities...");
    const cities = [
      {
        name: "London",
        country: createdCountries.find((c) => c.code === "uk")?.id,
        timezone: "Europe/London",
        coordinates: [-0.1276, 51.5074],
        isActive: true,
      },
      {
        name: "Manchester",
        country: createdCountries.find((c) => c.code === "uk")?.id,
        timezone: "Europe/London",
        coordinates: [-2.2426, 53.4794],
        isActive: true,
      },
      {
        name: "Dublin",
        country: createdCountries.find((c) => c.code === "ie")?.id,
        timezone: "Europe/Dublin",
        coordinates: [-6.2603, 53.3498],
        isActive: true,
      },
    ];

    const createdCities = [];
    for (const city of cities) {
      const created = await payload.create({
        collection: "cities",
        data: city as any,
      });
      createdCities.push(created);
      console.log(`✅ Created city: ${city.name}`);
    }

    // 3. Games
    console.log("🎳 Seeding games...");
    const games = [
      {
        name: "Bowling",
        description: [
          {
            children: [
              {
                text: "Classic 10-pin bowling with modern lanes and scoring systems.",
              },
            ],
          },
        ],
      },
      {
        name: "Pool",
        description: [
          {
            children: [
              {
                text: "Premium pool tables with professional equipment.",
              },
            ],
          },
        ],
      },
      {
        name: "Arcade Games",
        description: [
          {
            children: [
              {
                text: "Latest arcade games and retro classics.",
              },
            ],
          },
        ],
      },
    ];

    const createdGames = [];
    for (const game of games) {
      const created = await payload.create({
        collection: "games",
        data: game as any,
      });
      createdGames.push(created);
      console.log(`✅ Created game: ${game.name}`);
    }

    // 4. Menus
    console.log("🍕 Seeding menus...");
    const menus = [
      {
        name: "Main Food Menu",
        type: "food",
        items: [
          {
            name: "Classic Burger",
            description: "Beef burger with lettuce, tomato, and fries",
            price: 12.95,
            category: "Mains",
          },
          {
            name: "Margherita Pizza",
            description: "Tomato base, mozzarella, fresh basil",
            price: 10.95,
            category: "Pizza",
          },
          {
            name: "Wings & Rings",
            description: "Buffalo wings with onion rings",
            price: 8.95,
            category: "Sharing",
          },
        ],
      },
      {
        name: "Drinks Menu",
        type: "drinks",
        items: [
          {
            name: "Craft Beer",
            description: "Local craft beer on tap",
            price: 4.5,
            category: "Beer",
          },
          {
            name: "House Wine",
            description: "Red or white wine by the glass",
            price: 5.95,
            category: "Wine",
          },
          {
            name: "Soft Drinks",
            description: "Coke, Sprite, Orange",
            price: 2.95,
            category: "Soft Drinks",
          },
        ],
      },
    ];

    const createdMenus = [];
    for (const menu of menus) {
      const created = await payload.create({
        collection: "menus",
        data: menu as any,
      });
      createdMenus.push(created);
      console.log(`✅ Created menu: ${menu.name}`);
    }

    // 5. Venues
    console.log("🏢 Seeding venues...");
    const venues = [
      {
        status: "published",
        name: "Lane7 Camden",
        country: createdCountries.find((c) => c.code === "uk")?.id,
        city: createdCities.find((c) => c.name === "London")?.id,
        locationSpecifier: "Camden",
        location: {
          address: "123 Camden High Street\nCamden, London NW1 7JR",
          phone: "+44 20 1234 5678",
          email: "camden@lane7.co.uk",
          coordinates: [-0.1426, 51.5414],
        },
        openingHours: [
          { days: "Monday - Thursday", hours: "12pm - 11pm" },
          { days: "Friday - Saturday", hours: "12pm - 1am" },
          { days: "Sunday", hours: "12pm - 10pm" },
        ],
        hero: {
          title: "Lane7 Camden",
          subtitle: "Strike, Eat, Drink, Repeat",
          description: [
            {
              children: [
                {
                  text: "The ultimate bowling experience in the heart of Camden",
                },
              ],
            },
          ],
        },
        availableGames: [createdGames.find((g) => g.name === "Bowling")?.id],
        foodMenu: createdMenus.find((m) => m.type === "food")?.id,
        drinksMenu: createdMenus.find((m) => m.type === "drinks")?.id,
        services: {
          hasGroupBookings: true,
          hasGiftVouchers: true,
          hasPartyPackages: true,
        },
      },
      {
        status: "published",
        name: "Lane7 Dublin",
        country: createdCountries.find((c) => c.code === "ie")?.id,
        city: createdCities.find((c) => c.name === "Dublin")?.id,
        locationSpecifier: "City Centre",
        location: {
          address: "456 Grafton Street\nDublin 2, Ireland",
          phone: "+353 1 234 5678",
          email: "dublin@lane7.ie",
          coordinates: [-6.2603, 53.3498],
        },
        openingHours: [
          { days: "Monday - Thursday", hours: "11am - 11pm" },
          { days: "Friday - Saturday", hours: "11am - 1am" },
          { days: "Sunday", hours: "12pm - 10pm" },
        ],
        hero: {
          title: "Lane7 Dublin",
          subtitle: "Bowl Like a Champion",
          description: [
            {
              children: [
                {
                  text: "Premium bowling in Dublin's city centre",
                },
              ],
              locale: "en",
            },
          ],
        },
        availableGames: [createdGames.find((g) => g.name === "Bowling")?.id],
        foodMenu: createdMenus.find((m) => m.type === "food")?.id,
        drinksMenu: createdMenus.find((m) => m.type === "drinks")?.id,
        services: {
          hasGroupBookings: true,
          hasGiftVouchers: true,
          hasPartyPackages: false,
        },
      },
    ];

    for (const venue of venues) {
      await payload.create({
        collection: "venues",
        data: venue as any,
        locale: "en",
      });
      console.log(`✅ Created venue: ${venue.name}`);
    }

    console.log("🎉 All data seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    process.exit(0);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedAllData();
}

export { seedAllData };
