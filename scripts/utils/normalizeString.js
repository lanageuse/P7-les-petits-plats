/**
 * Normalise une chaîne de caractères en la transformant en minuscules et en retirant les accents
 * @param {string} string - La chaîne de caractères à normaliser
 * @returns {string} La chaîne de caractères normalisée en minuscules et sans accents
 * @example
 * normalizeString("Crème Brûlée") // retourne "creme brulee"
 */
export const normalizeString = string => {
    return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}