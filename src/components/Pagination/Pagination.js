import { usePagination, DOTS } from './usePagination';

import './Pagination.scss';

const Pagination = (props) => {
	const {
		onPageChange,
		totalCount,
		siblingCount,
		currentPage,
		pageSize,
	} = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
		pageSize,
	});

	if (currentPage === 0 || paginationRange.length < 2) {
		return null;
	}

	const onNext = () => {
		onPageChange(currentPage + 1);
	};

	const onPrevious = () => {
		onPageChange(currentPage - 1);
	};

	let lastPage = paginationRange[paginationRange.length - 1];
    let firstDotsUsed = false;
	return (
		<ul className='pagination-container'>
			<li
                key='arrow-left'
				className={
					currentPage === 1 ? 'pagination-item disabled' : 'pagination-item'
				}
				onClick={onPrevious}
			>
				<div className='arrow left' />
			</li>
			{paginationRange.map((pageNumber) => {
				if (pageNumber === DOTS && firstDotsUsed === false) {
                    firstDotsUsed = true;
					return <p key='dots-left' className='pagination-item dots'>...</p>;
				}
				if (pageNumber === DOTS && firstDotsUsed === true) {
                    firstDotsUsed = false;
					return <p key='dots-right' className='pagination-item dots'>...</p>;
				}

				return (
					<li
                        key={pageNumber.toString()}
						className={
							pageNumber === currentPage
								? 'pagination-item selected'
								: 'pagination-item'
						}
						onClick={() => onPageChange(pageNumber)}
					>
						{pageNumber}
					</li>
				);
			})}
			<li
                key='arrow-right'
				className={
					currentPage === lastPage
						? 'pagination-item disabled'
						: 'pagination-item'
				}
				onClick={onNext}
			>
				<div className='arrow right' />
			</li>
		</ul>
	);
};

export default Pagination;
