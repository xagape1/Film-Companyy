import { useSelector } from 'react-redux';
import PaginateLink from './PaginateLink';

const Paginate = ({ }) => {
    const { pages } = useSelector((state) => state.movies);

    return (
        <>
            <ul class="flex flex-row">
                {pages.map((page) => (
                    <PaginateLink page={page} />
                ))}
            </ul>
        </>
    )
}

export default Paginate;
