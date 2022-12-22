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
	Image,
} from '@chakra-ui/react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function List() {
	const router = useRouter();
	const [list, setList] = useState<any>();
	const getHistories = async () => {
		try {
			await axios
				.get('http://dacndut.online/plant/predict_list/', {
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
					},
				})
				.then(res => {
					setList(res?.data);
				});
		} catch (error) {}
	};

	const dateRender = date => {
		const newDate = new Date(date);
		return (
			newDate.getFullYear() +
			'-' +
			(newDate.getMonth() + 1) +
			'-' +
			newDate.getDate()
		);
	};

	useEffect(() => {
		getHistories();
	}, []);
	return (
		<Center py={6}>
			<Box
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
									<Th>Tên tiếng Anh</Th>
									<Th>Tên tiếng Việt</Th>
									<Th>Ảnh</Th>

									<Th>Mầm bệnh</Th>
									<Th>Triệu chứng</Th>
									<Th>Phương pháp điều trị bệnh</Th>
									<Th>Create at</Th>
								</Tr>
							</Thead>
							<Tbody>
								{list?.map((item, index) => (
									<Tr key={index}>
										<Td>{item?.PredictResult?.NameDisease_ENG}</Td>
										<Td>{item?.PredictResult?.NameDisease_VN} </Td>
										<Td>
											<Image w={200} src={item.Image} alt="icon" />
										</Td>
										<Td>{item?.PredictResult?.Pathogens}</Td>
										<Td>{item?.PredictResult?.Symptom}</Td>
										<Td>{item?.PredictResult?.Treatment}</Td>
										<Td>{dateRender(item?.DateTime)}</Td>
									</Tr>
								))}
							</Tbody>
						</Table>
					</TableContainer>
				</Stack>
			</Box>
		</Center>
	);
}
