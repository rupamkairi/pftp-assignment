export const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const apis = {
  locations: `${apiUrl}/locations`,
  locationById: (id: number) => `${apiUrl}/locations/${id}`,
};

export const credentials = {
  vercel: {
    clientId: "FlNcebZpcTv94gww",
    clientSecret: "775077d2a11f4a0a9d9635d7b42b6df4",
  },
};
