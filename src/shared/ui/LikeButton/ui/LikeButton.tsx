import classNames from 'classnames';
import { memo } from 'react';
import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '~static/icons/like.svg';
interface LikeButtonProps {
	isLike: boolean;
	onLikeToggle: () => void;
}
export const LikeButton: React.ComponentType<LikeButtonProps> = memo(
	({ isLike, onLikeToggle }) => {
		return (
			<button
				className={classNames(s['like'], {
					[s['like_is-active']]: isLike,
				})}
				onClick={onLikeToggle}>
				<LikeSvg />
			</button>
		);
	}
);

LikeButton.displayName = 'LikeButton';
