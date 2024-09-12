// pages/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import {
  ChakraProvider,
  Box,
  Text,
  Heading,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  Container,
  theme,
  extendTheme,
} from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#f7fafc',
        color: '#2d3748',
      },
    },
  },
});

const Home = () => {
  const [step, setStep] = useState(1);
  const [price, setPrice] = useState(0.5);
  const [averagePrice, setAveragePrice] = useState(0.5);
  const [finalTVL, setFinalTVL] = useState(3);

  const nextStep = () => {
    if (step === 2) {
      setAveragePrice(price);
    }
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const decision = averagePrice >= 0.5 ? 'accept' : 'reject';

  // Sample price data for the graph in Step 4
  const priceData = [
    { day: 1, price: averagePrice },
    { day: 2, price: averagePrice + 0.05 },
    { day: 3, price: averagePrice + 0.02 },
    { day: 4, price: averagePrice + 0.08 },
    { day: 5, price: averagePrice + 0.1 },
    { day: 6, price: averagePrice + 0.07 },
    { day: 7, price: averagePrice + 0.12 },
    { day: 8, price: averagePrice + 0.15 },
    { day: 9, price: averagePrice + 0.18 },
    { day: 10, price: averagePrice + 0.2 },
  ];

  return (
    <ChakraProvider theme={customTheme}>
      <Head>
        <title>DeFiChain Grants Walkthrough</title>
      </Head>
      <Container maxW="container.lg" py={8}>
        {/* Step 1 */}
        {step === 1 && (
          <Box>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
              DeFiChain Grants Program
            </Heading>
            <Text fontSize="xl" mb={4}>
              <strong>DeFiChain</strong> is running a grants program to help bootstrap DeFi projects.
		Teams can apply for <strong>$100k</strong> to fund the development
		of their project on DeFiChain.
            </Text>
            <Text fontSize="xl" mb={4}>
              One such project is <strong>Degen Vault</strong>, a team looking to build a yield aggregator.
            </Text>
          </Box>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Step 2: Market Prediction
            </Heading>
            <Text fontSize="xl" mb={4}>
              DeFiChain doesn't have infinite funding, and so only wants to fund
		the most promising projects: those that would be able to amass
		more than $5M in TVL within 3 months.
            </Text>
            <Text fontSize="xl" mb={4}>
		Understanding the predictive power of markets, DeFiChain uses
		markets to help make its grants decisions.
	</Text>
            <Text fontSize="xl" mb={4}>
		First, Degen Vault publishes their plan for building the premier
		yield aggregator on DeFiChain. Then, market participants bet on
              how much Total Value Locked (TVL) Degen Vault will achieve in 3 months if funded.
            </Text>
            <Text fontSize="xl" mb={4}>
              They do this by trading <strong>UP</strong> and <strong>DOWN</strong> contracts, 
		which are similar to the YES and NO contracts traded in prediction markets.
		UP will pay out $0.1 for every $1M in TVL in Degen Vault after 3
		months, up to a $1 payout for $10M in TVL.
            </Text>
            <Text fontSize="xl" mb={4}>
              The price of the UP contract reflects the market's expectation of the future TVL.
            </Text>
            <Box mb={6}>
              <Text fontSize="xl" mb={2}>
                Set UP Contract Price ($0 - $1):
              </Text>
              <Flex align="center">
                <Slider
                  flex="1"
                  value={price}
                  min={0}
                  max={1}
                  step={0.01}
                  onChange={(val) => setPrice(val)}
                >
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="blue.500" />
                  </SliderTrack>
                  <SliderThumb boxSize={6} bg="blue.500" />
                </Slider>
                <Box ml={4}>
                  <Text fontSize="xl" fontWeight="bold">{`$${price.toFixed(2)}`}</Text>
                </Box>
              </Flex>
            </Box>
            <Text fontSize="xl" mb={4}>
              Current Market Prediction: Degen Vault will have <strong>${(price * 10).toFixed(2)}M</strong> in TVL.
            </Text>
          </Box>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Step 3: Grant Decision
            </Heading>
            <Text fontSize="xl" mb={4}>
              After 3 days, the time-weighted average price of UP contracts is <strong>${averagePrice.toFixed(2)}</strong>.
            </Text>
            <Text fontSize="xl" mb={4}>
              Since the average price is {averagePrice >= 0.5 ? 'above' : 'below'} $0.50, the grant is{' '}
              <strong>{decision === 'accept' ? 'ACCEPTED' : 'REJECTED'}</strong>.
            </Text>
            <Text fontSize="xl" mb={4}>
              This decision is based on the collective prediction of the market participants.
            </Text>
          </Box>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Step 4: Post-Decision Process
            </Heading>
            {decision === 'reject' ? (
              <Text fontSize="xl" mb={4}>
                The grant was rejected. All traders receive their money back, and the UP and DOWN contracts are canceled.
              </Text>
            ) : (
              <>
                <Text fontSize="xl" mb={4}>
                  The grant was accepted. Markets remain open until the project is completed, allowing continuous trading.
                </Text>
                <Text fontSize="xl" mb={4}>
                  Continuous trading allows traders to enter and exit the market at any time, enabling them to liquidate or adjust their positions based on new information.
                </Text>
                <Text fontSize="xl" mb={4}>
                  Here's an example of how the UP contract price might fluctuate over time:
                </Text>
                <Box height="300px" mb={6}>
                  <ResponsiveContainer>
                    <LineChart data={priceData}>
                      <XAxis dataKey="day" tickLine={false} />
                      <YAxis domain={[0, 1]} tickFormatter={(value) => `$${value.toFixed(2)}`} />
                      <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                      <Line type="monotone" dataKey="price" stroke="#3182CE" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
                <Text fontSize="xl" mb={4}>
		    This liquid market has the byproduct of providing DeFiChain a
		    continuous view of how the grant is going. DeFiChain could
		    even use this market price in lieu of a milestone-based
		    system.
                </Text>
              </>
            )}
          </Box>
        )}

        {/* Step 5 */}
        {step === 5 && decision === 'accept' && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              Step 5: Payout Distribution
            </Heading>
            <Text fontSize="xl" mb={4}>
              After 3 months, Degen Vault achieves a TVL of <strong>${finalTVL}M</strong>.
            </Text>
            <Text fontSize="xl" mb={4}>
              UP holders receive <strong>${(finalTVL * 0.1).toFixed(2)}</strong> per contract.
            </Text>
            <Text fontSize="xl" mb={4}>
              DOWN holders receive the remainder: <strong>${(1 - finalTVL * 0.1).toFixed(2)}</strong> per contract.
            </Text>
          </Box>
        )}

        {step === 5 && decision === 'reject' && (
          <Box>
            <Heading as="h2" size="lg" mb={6}>
              End of Walkthrough
            </Heading>
            <Text fontSize="xl" mb={4}>
              Since the grant was rejected, the UP and DOWN contracts are voided, and there are no payouts.
            </Text>
          </Box>
        )}

        {/* Additional Explanation */}
        {step === 5 && (
          <Box mt={8}>
            <Heading as="h2" size="lg" mb={6}>
              How DeFiChain Benefits
            </Heading>
            <Text fontSize="xl" mb={4}>
              By running this grants program, DeFiChain encourages the development of new projects that enhance its ecosystem.
              Successful projects like Degen Vault attract more users and increase the utility of DeFiChain.
              This leads to greater adoption, network effects, and ultimately, an increase in the value of the DeFiChain platform.
            </Text>
          </Box>
        )}

        {/* Navigation Buttons */}
        <Flex mt={8} justify="space-between">
          {step > 1 && (
            <Button colorScheme="blue" onClick={prevStep} size="lg">
              Back
            </Button>
          )}
          {step < 5 && (
            <Button colorScheme="blue" onClick={nextStep} size="lg" ml="auto">
              Next
            </Button>
          )}
        </Flex>
      </Container>
    </ChakraProvider>
  );
};

export default Home;

