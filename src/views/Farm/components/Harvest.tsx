import React, { useMemo } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'

import { bnToDec, getItemValue } from 'utils'
import { StyledSubtitle } from 'components/PageHeader/PageHeader'

const Harvest: React.FC<{ poolId: string }> = ({ poolId }) => {
  const {
    earnedBalance,
    isHarvesting,
    isRedeeming,
    onHarvest,
  } = useFarming()

  const { status } = useWallet()

  const HarvestAction = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Claim"
          variant="secondary"
        />
      )
    }
    if (!getItemValue(isHarvesting, poolId)) {
      return (
        <Button
          full
          onClick={() => onHarvest(poolId)}
          text="Claim"
        />
      )
    }
    if (getItemValue(isHarvesting, poolId)) {
      return (
        <Button
          disabled
          full
          text="Claiming..."
          variant="secondary"
        />
      )
    }
  }, [
    isHarvesting,
    isRedeeming,
    onHarvest,
  ])

  const formattedEarnedBalance = useMemo(() => {
    if (earnedBalance) {
      return numeral(bnToDec(earnedBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [earnedBalance])

  return (
    <Card>
      <Container size="sm">
        <Spacer />
        <StyledSubtitle>Earn STRN</StyledSubtitle>
      </Container>
      <CardIcon>🧬</CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedEarnedBalance} />
          <Label text="Claimable STRNs" />
        </Box>
      </CardContent>
      <CardActions>
        {HarvestAction}
      </CardActions>
    </Card>
  )
}

export default Harvest