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
          <Title>{props.title}</Title>
        </Body>
        <Right />
      </Header>

      <Content style={{ padding: 20 }}>
        {props.children}
      </Content>
    </Container>
  )
}
