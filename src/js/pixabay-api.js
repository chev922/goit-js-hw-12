import axios from "axios";

export async function getImage(query, currentPage) {
    const BASE_URL = "https://pixabay.com/api/"
    const params = {
        key: "43250536-27133a3227562289f042ad016",
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 15,
        page: currentPage,
    };

    const res = await axios.get(BASE_URL, { params });
    return res.data;
};