import { setisLoading, setMovie, setError, setMovies, setPages, setPage, setFilter } from "./movieSlice";


export const getMovies = (authToken, page = 0) => {
    return async (dispatch, getState) => {
        let filter = getState().movies.filter;
        dispatch(setisLoading());

        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + authToken,
            method: "GET",
        };

        let url =
            page > 0
                ? "http://127.0.0.1:8000/api/movies?paginate=1&page=" + page
                : "http://127.0.0.1:8000/api/movies";

        let primsimbolo = page > 0 ? "&" : "?";

        let title = filter.title != "" ? "title=" + filter.title : "";

        let gender = filter.gender != "" ? "gender=" + filter.gender : "";

        if (title != "" && gender != "") {
            url = url + primsimbolo + title + "&" + gender;
        } else if (gender != "") {
            url = url + primsimbolo + gender;
        } else if (title != "") {
            url = url + primsimbolo + title;
        }

        const data = await fetch(url, headers);
        const resposta = await data.json();
        console.log(resposta);

        if (resposta.success == true) {
            if (page > 0) {
                dispatch(setMovies(resposta.data.collection));
                dispatch(setPages(resposta.data.links));
                console.log(resposta);
                console.log("ENTRAS1");
            } else {
                dispatch(setMovies(resposta.data));
                console.log("ENTRAS2");
            }
        } else {
            dispatch(setError(resposta.message));
            console.log("ENTRAS3");
        }
    };
};


export const getMovie = (id, authToken) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading());

        const headers = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "GET",
        };

        const url = "http://127.0.0.1:8000/api/movies/" + id;

        const data = await fetch(url, headers);
        const resposta = await data.json();

        if (resposta.success == true) {
            dispatch(setMovie(resposta.data));
            console.log(resposta)
        } else {
            dispatch(setError(resposta.message));
        }

    };
};

export const addMovie = (data2, authToken,) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading());

        let { title, description, gender, cover, intro } = data2;
        const formData = new FormData();

        formData.append("title", title);
        formData.append("description", description);
        formData.append("gender", gender);
        formData.append("cover", cover);
        formData.append("intro", intro);

        const headers = {

            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + authToken,
            },
            method: "POST",
            body: formData
        };

        const url = "http://127.0.0.1:8000/api/movies";

        const data = await fetch(url, headers);

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("Movie Creat");
            dispatch(getMovies(authToken));
        } else {
            setError(resposta.message);
        }
    };
};

export const editMovie = (authToken, movie, formulari) => {
    return async (dispatch, getState) => {
        let { title, description, gender, cover, intro } = formulari;
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("gender", gender);
        formData.append("cover", cover);
        formData.append("intro", intro);

        const data = await fetch(
            "http://127.0.0.1:8000/api/movies/" + movie.id,
            {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + authToken,
                },
                method: "POST",
                body: formData,
            }
        );

        const resposta = await data.json();

        if (resposta.success == true) {
            console.log("Movie Editat");
        } else {
            setError(resposta.message);
        }
    };
};

export const delMovie = (movie, authToken) => {
    return async (dispatch, getState) => {
        dispatch(setisLoading());

        const data = await fetch(
            "hhttp://127.0.0.1:8000/api/movies/" + movie.id,
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
        console.log(resposta);

        if (resposta.success == true) {
            dispatch(getMovies(0, authToken))
        }
    };
};


