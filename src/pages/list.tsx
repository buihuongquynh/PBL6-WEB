import { ArrowBackIcon } from '@chakra-ui/icons';
import {
	Center,
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableContainer,
	IconButton,
	Box,
	useColorModeValue,
	Text,
	Stack,
	Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function List() {
	const router = useRouter();

	return (
		<Center py={6}>
			<Box
				maxW={'1000px'}
				w={'full'}
				margin={'50px'}
				bg={useColorModeValue('white', 'gray.900')}
				boxShadow={'2xl'}
				rounded={'md'}
				p={6}
				overflow={'hidden'}
				position={'relative'}
			>
				<Flex
					alignItems={'center'}
					justifyContent={'space-between'}
					maxW={'50%'}
				>
					<IconButton
						colorScheme="teal"
						aria-label="Call Segun"
						size="lg"
						icon={<ArrowBackIcon color={'white'} />}
						onClick={() => router.back()}
						cursor={'pointer'}
						color={'teal'}
					/>
					<Text
						transform={'translateX(50%)'}
						color="teal"
						fontSize={32}
						fontWeight={700}
					>
						Lịch sử chẩn đoán
					</Text>
				</Flex>
				<Stack marginY={10}>
					<TableContainer>
						<Table variant="simple">
							<Thead>
								<Tr>
									<Th>Diagnostic results</Th>
									<Th>Exact ratio</Th>
									<Th>Create at</Th>
								</Tr>
							</Thead>
							<Tbody>
								<Tr>
									<Td>inches</Td>
									<Td>millimetres (mm)</Td>
									<Td>25.4</Td>
								</Tr>
								<Tr>
									<Td>feet</Td>
									<Td>centimetres (cm)</Td>
									<Td>30.48</Td>
								</Tr>
								<Tr>
									<Td>yards</Td>
									<Td>metres (m)</Td>
									<Td>0.91444</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</Stack>
			</Box>
		</Center>
	);
}
