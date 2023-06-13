import { setisSaving, setisLoading, setError, setMovie, setMovies, setPages, setPage } from "./movieSlice"

export const addMovie = (data2, authToken, navigate) => {
    return async (dispatch, getState) => {

        let { title, description, gender, cover, intro} = data2;
        const formData = new FormData;
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gender", gender);
        formData.append("cover", cover);
        formData.append("intro", intro);

        // dispatch(startLoadingReviews());
        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };

        const url = "http://127.0.0.1:8000/api/movies"

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("Movie creado: " + resposta.data)
            dispatch(setisSaving(false))

            navigate("/movies/" + resposta.data.id)

        }

        else {
            console.log(resposta)
            dispatch(setError(resposta.message));

        }
    };

}
export const getMovie = (authToken, id) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading(true));
        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const url = "http://127.0.0.1:8000/api/movies/" + id
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            dispatch(setisLoading(false));
            dispatch(setMovie(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}
export const delMovie = (authToken, navigate, id) => {
    return async (dispatch, getState) => {
        const data = await fetch(
            "http://127.0.0.1:8000/api/movies/" + id,
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "DELETE",
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("movie eliminado");
            navigate("/movies/list")
        } else {
            dispatch(setError(resposta.message));
        }

    };
};

export const handleUpdate = (authToken, id, formulari, navigate) => {
    return async (dispatch, getState) => {
        console.log(formulari.title)
        let { title, description,gender, cover,intro} = formulari;

        console.log(cover)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gender", gender);
        if (cover != undefined) formData.append("cover", cover);
        if (intro != undefined) formData.append("intro", intro);
        console.log(formData)
        const data = await fetch(
            "http://127.0.0.1:8000/api/movies/" + id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData
            }
        );
        const resposta = await data.json();
        if (resposta.success == true) {
            console.log("movie actualizado")
            navigate("/movies/" + resposta.data.id)
        } else {
            console.log(resposta.message)
            dispatch(setError(resposta.message));
        }

    };
};


export const getMovies = (authToken, page = 0) => {

    return async (dispatch, getState) => {
        let url = "";
        const filter = getState().movies.filter;
        console.log("entra: " + filter.title, filter.gender)

        dispatch(setisLoading(true));
        if (filter.title == "" && filter.gender == "") {
            url =
                page > 0

                    ? "http://127.0.0.1:8000/api/movies?paginate=1&page=" + page

                    : "http://127.0.0.1:8000/api/movies";
        } else if (!filter.title == "" && filter.gender == "") {
            url =

                page > 0

                    ? "http://127.0.0.1:8000/api/movies?paginate=1&page=" + page + "&gender=" + filter.gender

                    : "http://127.0.0.1:8000/api/movies?gender=" + filter.gender;
        } else if (!filter.title == "" && !filter.gender == "") {
            console.log("entra al bueno")
            url =

                page > 0

                    ? "http://127.0.0.1:8000/api/movies?paginate=1&page=" + page + "&title=" + filter.title + "&gender=" + filter.gender

                    : "http://127.0.0.1:8000/api/movies?title=" + filter.title + "&gender=" + filter.gender;;
        }
        else if (filter.title == "" && !filter.gender == "") {
            url =

                page > 0

                    ? "http://127.0.0.1:8000/api/movies?paginate=1&page=" + page + "&title=" + filter.title

                    : "http://127.0.0.1:8000/api/movies?title=" + filter.title;
        }

        const headers = {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };
        const data = await fetch(url, headers);
        const resposta = await data.json();
        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setMovies(resposta.data.collection));

                dispatch(setPages(resposta.data.links));

                console.log(resposta.data.links);

            } else {

                dispatch(setMovies(resposta.data));

            }
            dispatch(setisLoading(false));
            // dispatch(setPlaces(resposta.data));
            console.log(resposta.data)
        }
        else {
            dispatch(setError(resposta.message));
        }
    };
}