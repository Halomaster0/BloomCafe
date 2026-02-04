export interface MenuItem {
    name: string;
    category: string;
    price: number;
    description?: string;
    image?: string;
}

export const TOP_LEVEL_CATEGORIES = {
    "Food": ["Appetizers", "Main Dishes", "Breakfast", "Salads", "Desserts"],
    "Drinks": ["Hot Drinks", "Mocktails", "Fresh Juice", "Milkshakes", "Smoothies", "Cold Drinks", "Mojitos"],
    "Shisha": ["Shisha"]
} as const;

export type TopLevelCategory = keyof typeof TOP_LEVEL_CATEGORIES;

export const MENU_CATEGORIES = [
    "Appetizers",
    "Main Dishes",
    "Breakfast",
    "Salads",
    "Shisha",
    "Mocktails",
    "Fresh Juice",
    "Milkshakes",
    "Smoothies",
    "Hot Drinks",
    "Desserts",
    "Cold Drinks",
    "Mojitos"
] as const;

export type MenuCategory = typeof MENU_CATEGORIES[number];

export const MENU_DATA: MenuItem[] = [
    // Appetizers
    { name: "The Bloom Mix", category: "Appetizers", price: 19.99 },
    { name: "Spring Rolls", category: "Appetizers", price: 10.00 },
    { name: "Hummus", category: "Appetizers", price: 8.00 },
    { name: "Baba Ganoush", category: "Appetizers", price: 8.00 },
    { name: "Labaneh", category: "Appetizers", price: 8.00 },
    { name: "Makdous", category: "Appetizers", price: 8.00 },
    { name: "Green Olive", category: "Appetizers", price: 6.00 },
    { name: "Falafel", category: "Appetizers", price: 8.00 },
    { name: "Beef Sausages", category: "Appetizers", price: 10.99 },
    { name: "Fried Cauliflower", category: "Appetizers", price: 10.99 },
    { name: "The Bloom Eggplant with Cheese", category: "Appetizers", price: 12.99 },
    { name: "French Fries", category: "Appetizers", price: 7.00 },
    { name: "Cheese Rolls", category: "Appetizers", price: 10.00 },
    { name: "Beef Kibbeh", category: "Appetizers", price: 11.50 },
    { name: "The Bloom Shrimp", category: "Appetizers", price: 15.99 },
    { name: "Hummus with Beef", category: "Appetizers", price: 12.99 },

    // Main Dishes
    { name: "Sharhat - Mutafya Steak Slices", category: "Main Dishes", price: 22.50 },
    { name: "Chicken Nuggets", category: "Main Dishes", price: 12.00 },
    { name: "The Bloom Burger", category: "Main Dishes", price: 14.99 },
    { name: "The Bloom Chicken Burger", category: "Main Dishes", price: 14.99 },
    { name: "Steak Pita Wrap", category: "Main Dishes", price: 16.99 },
    { name: "Fajita Pita Wrap", category: "Main Dishes", price: 15.99 },

    // Breakfast
    { name: "Fattet Hummus", category: "Breakfast", price: 9.99 },
    { name: "Omelette with Veggies", category: "Breakfast", price: 13.99 },
    { name: "Omelette with Beef Sausage", category: "Breakfast", price: 15.99 },
    { name: "Omelette with Mushroom", category: "Breakfast", price: 13.99 },
    { name: "Sunny Side Up Eggs", category: "Breakfast", price: 12.99 },
    { name: "Foul", category: "Breakfast", price: 8.99 },

    // Salads
    { name: "Tabbouleh", category: "Salads", price: 9.99 },
    { name: "Fattoush", category: "Salads", price: 9.99 },
    { name: "Caesar Salad", category: "Salads", price: 9.99 },

    // Shisha
    { name: "The Bloom (VIP) Love 66", category: "Shisha", price: 44.99 },
    { name: "The Bloom (VIP) Ladykiller", category: "Shisha", price: 44.99 },
    { name: "The Bloom (VIP) Sky Fall", category: "Shisha", price: 44.99 },
    { name: "Blueberry", category: "Shisha", price: 22.50 },
    { name: "Gum Mint", category: "Shisha", price: 22.50 },
    { name: "Grape Mint", category: "Shisha", price: 22.50 },
    { name: "Orange Mint", category: "Shisha", price: 22.50 },
    { name: "Blueberry Mint", category: "Shisha", price: 22.50 },
    { name: "Lemon Mint", category: "Shisha", price: 22.50 },
    { name: "Mint", category: "Shisha", price: 22.50 },
    { name: "Double Apple", category: "Shisha", price: 22.50 },
    { name: "Gum Mint Mazaya", category: "Shisha", price: 22.50 },
    { name: "Gum with Cinnamon", category: "Shisha", price: 22.50 },
    { name: "Paan", category: "Shisha", price: 22.50 },
    { name: "Paan with Mint", category: "Shisha", price: 22.50 },
    { name: "Peach", category: "Shisha", price: 22.50 },

    // Mocktails
    { name: "Purple Death", category: "Mocktails", price: 11.00 },
    { name: "California", category: "Mocktails", price: 11.00 },
    { name: "Mango Snow", category: "Mocktails", price: 11.00 },

    // Fresh Juice
    { name: "Fresh Carrots with Orange", category: "Fresh Juice", price: 8.99 },
    { name: "Fresh Orange Juice", category: "Fresh Juice", price: 7.99 },
    { name: "Fresh Lemonade", category: "Fresh Juice", price: 8.99 },
    { name: "Fresh Strawberry", category: "Fresh Juice", price: 8.99 },
    { name: "Fresh Mango Juice", category: "Fresh Juice", price: 8.99 },
    { name: "Fresh Carrot Juice", category: "Fresh Juice", price: 8.50 },
    { name: "Cranberry Juice", category: "Fresh Juice", price: 8.99 },
    { name: "Pomegranate Juice", category: "Fresh Juice", price: 8.99 },
    { name: "Fresh Kiwi Juice", category: "Fresh Juice", price: 8.99 },

    // Milkshakes
    { name: "Chocolate", category: "Milkshakes", price: 9.99 },
    { name: "Vanilla", category: "Milkshakes", price: 9.99 },
    { name: "Strawberry", category: "Milkshakes", price: 9.99 },
    { name: "Mango", category: "Milkshakes", price: 9.99 },
    { name: "Nutella", category: "Milkshakes", price: 9.99 },
    { name: "Oreo", category: "Milkshakes", price: 9.99 },
    { name: "Ferrero Rocher", category: "Milkshakes", price: 11.99 },
    { name: "Mango Snow", category: "Milkshakes", price: 11.00 },
    { name: "Frappuccino (Caramel/Chocolate/Vanilla)", category: "Milkshakes", price: 11.00 },

    // Smoothies
    { name: "Mixed Berries", category: "Smoothies", price: 8.99 },
    { name: "Lemon Mints", category: "Smoothies", price: 8.99 },
    { name: "Passion Fruit Mango", category: "Smoothies", price: 9.99 },
    { name: "Mango", category: "Smoothies", price: 8.99 },
    { name: "Strawberry", category: "Smoothies", price: 8.99 },

    // Hot Drinks
    { name: "Latte", category: "Hot Drinks", price: 6.99 },
    { name: "French Coffee", category: "Hot Drinks", price: 7.50 },
    { name: "Karak Tea Pot", category: "Hot Drinks", price: 15.99 },
    { name: "Tea Pot", category: "Hot Drinks", price: 13.99 },
    { name: "Arabic Coffee S", category: "Hot Drinks", price: 7.99 },
    { name: "Arabic Coffee M", category: "Hot Drinks", price: 10.99 },
    { name: "Arabic Coffee L", category: "Hot Drinks", price: 15.99 },
    { name: "Americano", category: "Hot Drinks", price: 6.50 },
    { name: "Double Espresso", category: "Hot Drinks", price: 5.99 },
    { name: "Karak Tea Cups", category: "Hot Drinks", price: 5.99 },
    { name: "Sahlab", category: "Hot Drinks", price: 7.50 },
    { name: "Anise", category: "Hot Drinks", price: 4.50 },
    { name: "Tea", category: "Hot Drinks", price: 4.50 },
    { name: "Turkish Coffee", category: "Hot Drinks", price: 5.99 },
    { name: "Lemon & Ginger", category: "Hot Drinks", price: 6.50 },
    { name: "Macchiato", category: "Hot Drinks", price: 7.50 },
    { name: "Cappuccino", category: "Hot Drinks", price: 6.99 },
    { name: "Hot Chocolate", category: "Hot Drinks", price: 6.99 },
    { name: "Mocha", category: "Hot Drinks", price: 6.99 },
    { name: "Espresso", category: "Hot Drinks", price: 3.00 },
    { name: "Herbal Tea (Bengal Spice)", category: "Hot Drinks", price: 4.99 },
    { name: "Indian Tea", category: "Hot Drinks", price: 4.99 },

    // Desserts
    { name: "Chocolate Crepe", category: "Desserts", price: 13.99 },
    { name: "Fruit Crepe", category: "Desserts", price: 15.99 },
    { name: "Kinder Bueno Crepe", category: "Desserts", price: 14.99 },
    { name: "Ferrero Rocher Crepe", category: "Desserts", price: 14.99 },
    { name: "Oreo Crepe", category: "Desserts", price: 14.99 },
    { name: "Rice Krispy Crepe", category: "Desserts", price: 14.99 },
    { name: "Warpat", category: "Desserts", price: 5.99 },
    { name: "Mini Pancakes", category: "Desserts", price: 10.99 },

    // Cold Drinks
    { name: "Water", category: "Cold Drinks", price: 2.50 },
    { name: "Redbull", category: "Cold Drinks", price: 5.99 },
    { name: "The Bloom Redbull", category: "Cold Drinks", price: 8.99 },
    { name: "Pop", category: "Cold Drinks", price: 3.50 },

    // Mojitos
    { name: "Strawberry", category: "Mojitos", price: 10.99 },
    { name: "Mango", category: "Mojitos", price: 10.99 },
    { name: "Passion Fruit", category: "Mojitos", price: 10.99 },
    { name: "Lemon", category: "Mojitos", price: 10.99 },
];
