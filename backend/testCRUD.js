import dotenv from "dotenv";
dotenv.config();

// Helper for fetch requests
async function request(url, method = "GET", body = null) {
  const options = { method, headers: { "Content-Type": "application/json" } };
  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    const text = await response.text();

    // Try parsing JSON
    try {
      return { status: response.status, data: JSON.parse(text) };
    } catch {
      return { status: response.status, data: { success: false, raw: text } };
    }
  } catch (error) {
    return { status: 0, data: { success: false, error } };
  }
}

// Base API URL
const BASE_URL = "http://localhost:5000/api/products";

async function runCRUD() {
  console.log("==== STARTING CRUD TEST ====");

  console.log("\n1) Creating product 1...");
  const product1 = {
    name: "Product One",
    price: 10,
    image: "https://example.com/product1.jpg"
  };
  const create1 = await request(BASE_URL, "POST", product1);
  const id1 = create1.data?.data?._id;
  console.log("Created:", create1.data);

  console.log("\n2) Creating product 2...");
  const product2 = {
    name: "Product Two",
    price: 20,
    image: "https://example.com/product2.jpg"
  };
  const create2 = await request(BASE_URL, "POST", product2);
  const id2 = create2.data?.data?._id;
  console.log("Created:", create2.data);

  // ----- READ ALL PRODUCTS -----
  console.log("\n3) Reading all products...");
  let readAll = await request(BASE_URL);
  console.log("Products:", readAll.data);

  // ----- UPDATE PRODUCT 1 -----
  console.log("\n4) Updating product 1...");
  const updatedProduct1 = {
    name: "Product One Updated",
    price: 15,
    image: product1.image
  };
  const update1 = await request(`${BASE_URL}/${id1}`, "PUT", updatedProduct1);
  console.log("Updated product 1:", update1.data);

  // ----- READ ALL PRODUCTS -----
  console.log("\n5) Reading all products after update...");
  readAll = await request(BASE_URL);
  console.log("Products:", readAll.data);

  // ----- DELETE PRODUCT 2 -----
  console.log("\n6) Deleting product 2...");
  const delete2 = await request(`${BASE_URL}/${id2}`, "DELETE");
  console.log("Deleted product 2:", delete2.data);

  // ----- READ ALL PRODUCTS -----
  console.log("\n7) Reading remaining products...");
  readAll = await request(BASE_URL);
  console.log("Remaining products:", readAll.data);

  console.log("\n==== SIMPLE CRUD TEST COMPLETE ====");
}

await runCRUD();

