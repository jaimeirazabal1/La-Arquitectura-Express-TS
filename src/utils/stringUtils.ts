/**
 * Capitaliza la primera letra de una cadena.
 * @param str La cadena a capitalizar.
 * @returns La cadena con la primera letra en mayúscula.
 */
export function capitalizeFirstLetter(str: string): string {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
} 