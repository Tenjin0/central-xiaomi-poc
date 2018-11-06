export const DEFAULT_PAGE = 1;
export const DEFAULT_FILTER = "";
export const DEFAULT_PER_PAGE = 10;
export const API_PORT = 3001
export const API_HOST = "localhost"
export const API_URL = `${API_HOST}:${API_PORT}`
export const PAGE_SIZES = [5, 10, 15, 20]
export const API_GRAPHQL_URL = `http://${API_URL}/graphql`
export default {
	API_GRAPHQL_URL,
	API_URL,
	DEFAULT_FILTER,
	DEFAULT_PAGE,
	DEFAULT_PER_PAGE,
}
