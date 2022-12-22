import { HamburgerIcon } from '@chakra-ui/icons';
import {
	Box,
	Center,
	useColorModeValue,
	Image,
	Text,
	Button,
	Stack,
	Flex,
} from '@chakra-ui/react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import ImageUploading from 'react-images-uploading';

export default function Home() {
	const router = useRouter();
	const [images, setImages] = useState([]);
	const [result, setResult] = useState<any>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const maxNumber = 69;

	const onChange = imageList => {
		setImages(imageList);
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

	const handleDiagnose = async () => {
		const formdata = new FormData();
		formdata.append('_method', 'Post');
		formdata.append('link', images[0]?.file);
		setIsLoading(true);
		try {
			await axios
				.post('http://dacndut.online/plant/ai/', formdata, {
					headers: {
						'Access-control-allow-origin': '*',
						'Content-type': 'application/json; charset=UTF-8',
					},
				})
				.then(res => {
					setResult(res?.data);
					setIsLoading(false);
				});
		} catch (error) {}
	};

	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/628283.ico" />
			</Head>
			<Center py={6}>
				<Box
					maxW={'1000px'}
					w={'full'}
					margin={'50px'}
					bg={useColorModeValue('white', 'gray.900')}
					boxShadow={'2xl'}
					rounded={'md'}
					p={6}
					pb={20}
					overflow={'hidden'}
					position={'relative'}
				>
					<Flex alignItems={'center'} justifyContent={'space-between'} mb={10}>
						<Stack w={'50%'} />
						<Flex
							alignItems={'center'}
							justifyContent={'space-between'}
							w={'50%'}
						>
							<Text
								transform={'translateX(-50%)'}
								color="teal"
								fontSize={32}
								fontWeight={700}
							>
								Chẩn đoán bệnh cây trồng
							</Text>
							<HamburgerIcon
								onClick={() => router.push('list')}
								cursor={'pointer'}
								fontSize={30}
								color={'teal'}
							/>
						</Flex>
					</Flex>

					<Stack marginY={10} maxW={'60%'} margin={'0 auto'}>
						<ImageUploading
							multiple
							value={images}
							onChange={onChange}
							maxNumber={maxNumber}
							dataURLKey="data_url"
						>
							{({
								imageList,
								onImageUpload,
								onImageUpdate,
								onImageRemove,
								isDragging,
								dragProps,
							}) => (
								<div className="upload__image-wrapper">
									{!imageList.length ? (
										<button
											className="submit"
											style={isDragging ? { color: 'red' } : undefined}
											onClick={onImageUpload}
											{...dragProps}
										>
											<div className="button-upload">
												<Image
													alt="icon"
													width={50}
													marginBottom={4}
													src="images.png"
												/>
												<Text color={'#555'}>
													Click to browse or drag and drop your files
												</Text>
											</div>
										</button>
									) : (
										<div className="image">
											{imageList.map((image, index) => (
												<Stack key={index} position={'relative'}>
													<Image
														onClick={() => onImageUpdate(index)}
														src={image['data_url']}
														alt="icon"
														width={'100%'}
													/>
													<span className="close">
														<a
															onClick={() => onImageRemove(index)}
															href="#"
															className="close-button v2"
														></a>
													</span>
												</Stack>
											))}
										</div>
									)}
									<Button
										className="submit"
										marginTop={5}
										colorScheme="teal"
										width={'100%'}
										onClick={handleDiagnose}
										isLoading={isLoading}
									>
										Chẩn đoán
									</Button>
									<Text
										textAlign={'center'}
										marginTop={5}
										marginBottom={5}
										fontSize={20}
										fontWeight={700}
									>
										Kết quả chẩn đoán:
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Tên bệnh tiếng anh: {result?.PredictResult?.NameDisease_ENG}
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Tên bệnh tiếng việt: {result?.PredictResult?.NameDisease_VN}
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Tỉ lệ chính xác:{' '}
										{result?.Confident && (result?.Confident * 100).toFixed(2)}%
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Mầm bệnh : {result?.PredictResult?.Pathogens}
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Triệu chứng : {result?.PredictResult?.Symptom}
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Phương pháp điều trị bệnh :{' '}
										{result?.PredictResult?.Treatment}
									</Text>
									<Text fontSize="lg" textAlign={'center'}>
										Create at :{' '}
										{result?.DateTime && dateRender(result?.DateTime)}
									</Text>
								</div>
							)}
						</ImageUploading>
					</Stack>
				</Box>
			</Center>
		</>
	);
}
