/**
 * Base URL configuration for the application.
 * 
 * In production (GitHub Pages), this will be an empty string since
 * the site deploys at the root: https://supparer2.github.io
 * 
 * In development, this will also be empty string.
 * 
 * This constant should be imported and used when constructing
 * any URLs, paths, fetch requests, etc.
 * 
 * Example usage:
 * - fetch(`${baseUrl}/api/data`)
 * - <a href={`${baseUrl}/about`}>
 * - <img src={`${baseUrl}/images/logo.png`} />
 */
export const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '') || '';


