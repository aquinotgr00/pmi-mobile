import React from 'react'
import { Container, Content, Header, Left, Body, Right, Title } from 'native-base'
import { BackButton, MenuButton } from './HeaderButtons'

export function Screen (props) {
  const contentStyle = props.unpadded ? { paddingHorizontal: 15 } : { padding: 15 }
  const contentContainerStyle = props.verticalCenter ? { flexGrow: 1, justifyContent: 'center' } : {}
  return (
    <Container>
      <Header transparent>
        <Left>
          { props.menu && <MenuButton /> }
          { props.back && <BackButton /> }
        </Left>

        <Body style={{ flex: 6 }}>
          {typeof props.title === 'string'
            ? <Title style={{ fontWeight: '300' }}>{props.title}</Title>
            : props.title
          }
        </Body>
        <Right />
      </Header>

      <Content
        style={contentStyle}
        refreshControl={props.refreshControl}
        contentContainerStyle={contentContainerStyle}
      >
        {props.children}
      </Content>
    </Container>
  )
}
