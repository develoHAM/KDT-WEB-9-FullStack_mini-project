import hamster from './imgs/hamster.gif';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const _Title = styled.h1`
	margin-top: 10%;
	font-family: 'KCC-DodamdodamR';
	text-align: center;
`;

const _Hamster = styled.img`
	display: block;
	width: 10%;
	margin: auto;
`;

export default function Main() {
	return (
		<>
			<_Title>햄스터를 클릭해주세요~</_Title>
			<Link to='/todo'>
				<_Hamster src={hamster} alt='햄스터' />
			</Link>
		</>
	);
}
