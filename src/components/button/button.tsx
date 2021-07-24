import { forwardRef } from 'react';
import { ElementType, ForwardRefRenderFunction, MouseEventHandler, MutableRefObject, ReactNode } from 'react';
import { StyledButton } from './styled';

export type ButtonType = 'default' | 'danger' | 'ghost' | 'secondary';

export type SizeType = 'default' | 'large' | 'small';

interface IButtonProps {
	type: ButtonType;
	icon: ElementType;
	size: SizeType;
	className: string;
	children: ReactNode;
	isLoading: boolean;
	disabled: boolean;
}

type HTMLButtonProps = { onClick: MouseEventHandler<HTMLButtonElement> } & IButtonProps;

type HTMLAnchorProps = { href: string } & IButtonProps;

// For React Router Link
type CustomNodeProps = {
	as: ElementType;
	to: string;
} & IButtonProps;

export type ButtonProps = Partial<HTMLButtonProps> & Partial<HTMLAnchorProps> & Partial<CustomNodeProps>;

const Button: ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
	const {
		type = 'default',
		icon,
		size = 'default',
		className = '',
		children,
		disabled = false,
		isLoading = false,
		onClick,
		href,
		as,
		to,
	} = props;

	const styles = {
		innerType: type,
		size,
		disabled,
		withText: children !== null,
	};

	if (as) {
		return (
			<StyledButton as={as} to={to} className={className} {...styles}>
				{isLoading ? '...Loading' : children}
			</StyledButton>
		);
	}

	if (href) {
		return (
			<StyledButton as='a' href={href} className={className} {...styles}>
				{isLoading ? '...Loading' : children}
			</StyledButton>
		);
	}

	return (
		<StyledButton as='button' type='button' onClick={onClick} className={className} {...styles}>
			{isLoading ? '...Loading' : children}
		</StyledButton>
	);
};

export default forwardRef<unknown, ButtonProps>(Button);
