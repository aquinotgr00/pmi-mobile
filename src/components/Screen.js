import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Container, Content, Header, Left, Body, Right, Title } from 'native-base'
import { BackButton, MenuButton } from './HeaderButtons'
import Color from 'src/constants/Color'
import { Loader } from 'src/components'

export function Screen (props) {
  const {menu, back, title, right, refreshControl, isLoading, children, unpadded, verticalCenter} = props
  const contentStyle = unpadded ? { paddingHorizontal: 15 } : { padding: 15 }
  const contentContainerStyle = verticalCenter ? { flexGrow: 1, justifyContent: 'center' } : {}
  
  return (
    <Container>
      <Header transparent>
        <Left>
          { menu && <MenuButton /> }
          { back && <BackButton /> }
        </Left>

        <Body style={{ flex: 6 }}>
          {typeof title === 'string'
            ? <Title style={{ fontWeight: '600' }}>{title}</Title>
            : title
          }
        </Body>
        <Right>
          { right }
        </Right>
      </Header>

      <Content
        style={contentStyle}
        refreshControl={refreshControl}
        contentContainerStyle={contentContainerStyle}
      >
        {children}
        
      </Content>
      {isLoading && 
        <Loader loading={isLoading} />
      }
    </Container>
  )
}
