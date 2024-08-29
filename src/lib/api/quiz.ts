import type { QuizQuestion } from '@/src/lib/types.ts';
import type { SupabaseClient } from 'betfinio_app/supabase';

const mockQuestions: QuizQuestion[] = [
	{
		question: 'How should you protect your MetaMask wallet after creating it?',
		exp: 50,
		options: [
			{ content: 'Save your seed phrase in cloud storage for convenience', is_right: false },
			{ content: 'Text your seed phrase to yourself for quick access', is_right: false },
			{ content: 'Securely store your seed phrase (12 words) offline and never share it with anyone', is_right: true },
			{ content: 'Take a screenshot of your seed phrase and keep it on your phone', is_right: false },
		],
	},

	{
		question: 'What happens if someone gains access to your MetaMask seed phrase?',
		exp: 50,
		options: [
			{ content: "They can view your transaction history but can't take any action", is_right: false },
			{ content: 'They can control your wallet and steal all your funds', is_right: true },
			{ content: "They can only see your account balance but can't transfer any funds", is_right: false },
			{ content: "They can't do anything without your permission", is_right: false },
		],
	},
	{
		question: 'Why is purchasing MATIC important if you plan to swap it for BET?',
		exp: 100,
		options: [
			{ content: 'MATIC provides faster transaction speeds on the Bitcoin network', is_right: false },
			{ content: 'MATIC is used to access exclusive content on MetaMask', is_right: false },
			{ content: 'MATIC is required both to pay for gas fees and to perform swaps for BET on the Polygon network', is_right: true },
			{ content: 'MATIC is used to pay for gas fees on the Ethereum network', is_right: false },
		],
	},
	{
		question: 'Why might someone want to acquire BET tokens?',
		exp: 100,
		options: [
			{ content: 'BET is necessary to mine Bitcoin', is_right: false },
			{
				content: 'BET allows players to participate in casino games and provides investors the opportunity to stake and become co-owners of the casino',
				is_right: true,
			},
			{ content: 'BET is needed to pay for gas fees on the Polygon network', is_right: false },
			{ content: 'BET provides discounts on Ethereum gas fees', is_right: false },
		],
	},
	{
		question: 'What is the primary use of BET for investors?',
		exp: 100,
		options: [
			{ content: 'To purchase in-game items', is_right: false },
			{ content: 'To trade for other cryptocurrencies', is_right: false },
			{ content: "To stake and earn a share of the casino's profits as a co-owner", is_right: true },
			{ content: 'To pay for transaction fees on Uniswap', is_right: false },
		],
	},
	{
		question: 'What is the staking period for both staking options?',
		exp: 100,
		options: [
			{ content: '40 weeks', is_right: false },
			{ content: '60 weeks', is_right: false },
			{ content: '52 weeks', is_right: false },
			{ content: '80 weeks', is_right: true },
		],
	},
	{
		question: 'What are the two staking options in the Betfin project?',
		exp: 100,
		options: [
			{ content: 'Passive and Active', is_right: false },
			{ content: 'Short-term and Long-term', is_right: false },
			{ content: 'Dynamic and Conservative', is_right: true },
			{ content: 'Flexible and Rigid', is_right: false },
		],
	},
];

export const fetchQuiz = async (lesson: number, client?: SupabaseClient): Promise<QuizQuestion[]> => {
	if (!client) {
		throw new Error('No client provided');
	}
	const quiz = await client.from('lessons').select('quiz').eq('id', lesson).single();
	console.log(quiz.data);

	return quiz.data?.quiz || [];
};
