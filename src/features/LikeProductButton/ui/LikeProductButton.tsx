import { toast } from 'react-toastify';
import { memo, useCallback, useOptimistic, startTransition } from 'react';
import { useAppSelector } from '~shared/store';
import { userSelectors } from '~entities/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
	IErrorResponse,
} from '~entities/product';
import { LikeButton } from '~shared/ui/LikeButton';

type TLikeButtonProps = {
	product: Product;
};

export const LikeProductButton = memo(({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);
	const [optimisticLike, setOptimisticLike] = useOptimistic(
		product?.likes.some((l) => l.userId === user?.id)
	);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const toggleLike = useCallback(() => {
		startTransition(async () => {
			if (!accessToken) {
				toast.warning('Вы не авторизованы');
				return;
			}
			let response;

			setOptimisticLike(!optimisticLike);

			if (optimisticLike) {
				response = await deleteLike({ id: `${product.id}` });
			} else {
				setOptimisticLike(true);
				response = await setLike({ id: `${product.id}` });
			}

			if (response.error) {
				const error = response.error as IErrorResponse;
				toast.error(error.data.message);
				setOptimisticLike((like) => !like);
			}
		});
	}, [
		accessToken,
		optimisticLike,
		setOptimisticLike,
		deleteLike,
		setLike,
		product,
	]);

	return <LikeButton isLike={optimisticLike} onLikeToggle={toggleLike} />;
});

LikeProductButton.displayName = 'LikeProductButton';
