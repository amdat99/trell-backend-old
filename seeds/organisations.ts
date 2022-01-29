import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("organisation").del();

  // Inserts seed entries
  await knex("organisation").insert([
    {
      id: "3434343434",
      public_id: "3rgh434343434",
      status: "active",
      name: "Fletchbiz",
      image: "https://picsum.photos/200/300",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      website: "https://fletchbiz.co.uk",
      email: "info@fletchbiz.co.uk",
      phone: "0123456789",
      address: "123 Fake Street",
      postcode: "AB12 3CD",
      city: "Fakeville",
      country: "United Kingdom",
      latitude: 51.12345,
      longitude: -0.12345,
    },
    {
      id: "34343434irjirjjr34",
      public_id: "3rgh4hghttttt34343434",
      status: "active",
      name: "Rakesh",
      image: "https://picsum.photos/200/300",
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
      website: "https://fletchbiz.co.uk",
      email: "rakesh@fletchbiz.co.uk",
      phone: "0123456789",
      address: "123 Fake Street",
      postcode: "AB12 3CD",
      city: "Fakeville",
      country: "India",
      latitude: 51.12345,
      longitude: -0.12345,
    },
  ]);
}
