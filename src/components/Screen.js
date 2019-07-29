import React from 'react'
import { Container, Content, Header, Left, Body, Right, Title } from 'native-base'
import { BackButton, MenuButton } from './HeaderButtons'

export function Screen (props) {
  return (
    <Container>
      <Header transparent>
        <Left>
          { props.menu && <MenuButton /> }
          { props.back && <BackButton /> }
        </Left>
        <Body style={{ flex: 6 }}>
          <Title style={{ fontWeight: '300' }}>{props.title}</Title>
        </Body>
        <Right />
      </Header>

      <Content style={{ padding: 15 }}>
        {props.children}
      </Content>
    </Container>
  )
}
