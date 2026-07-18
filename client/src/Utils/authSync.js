export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://algorithmist-api.onrender.com";

const AUTH_STORAGE_KEYS = new Set([
  "algolistedAuthToken",
  "algolistedUser",
  "userId",
]);

const parseLocalStorageValue = (value) => {
  try {
    return JSON.parse(value);
  } catch (error) {
    return value;
  }
};

export const collectLocalStorageData = () => {
  const data = {};

  for (let index = 0; index < localStorage.length; index += 1) {
    const key = localStorage.key(index);

    if (!key || AUTH_STORAGE_KEYS.has(key)) {
      continue;
    }

    data[key] = parseLocalStorageValue(localStorage.getItem(key));
  }

  return data;
};

export const saveAuthenticatedUser = ({ token, user }) => {
  if (token) {
    localStorage.setItem("algolistedAuthToken", token);
  }

  if (user) {
    localStorage.setItem("algolistedUser", JSON.stringify(user));

    if (user._id) {
      localStorage.setItem("userId", user._id);
    }
  }
};

export const syncLocalStorageToServer = async (token) => {
  const authToken = token || localStorage.getItem("algolistedAuthToken");

  if (!authToken) {
    throw new Error("Please log in before syncing local data.");
  }

  const response = await fetch(`${API_BASE_URL}/auth/sync-local-data`, {
    method: "post",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      localData: collectLocalStorageData(),
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Unable to sync local data.");
  }

  return result;
};
