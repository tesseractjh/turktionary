import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { border, flex } from '@styles/minxin';
import useLanguage from '@hooks/useLanguage';
import pxToRem from '@utils/pxToRem';
import EllipsisMenu from '../../../../common/EllipsisMenu';

interface POSItemProps {
  id: number;
  title: string;
  text: string;
  examples: string[];
  exampleOrders: number[];
}

const Container = styled.li`
  ${flex()};
  padding-bottom: ${pxToRem(10)};
  margin-bottom: ${pxToRem(20)};
  border-bottom: ${border()} ${({ theme }) => theme.color.BORDER};
`;

const Content = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const Title = styled.h4`
  margin-bottom: ${pxToRem(16)};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSize.lg};

  @media ${({ theme }) => theme.media.mobile} {
    margin-bottom: ${pxToRem(12)};
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;

const Text = styled.p`
  font-size: ${({ theme }) => theme.fontSize.sm};

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.sm};
  }
`;

const ExampleList = styled.ul`
  ${flex('flex-start')}
  flex-wrap: wrap;
  gap: ${pxToRem(16)};
  margin-top: ${pxToRem(16)};

  @media ${({ theme }) => theme.media.mobile} {
    margin-top: ${pxToRem(12)};
  }
`;

const Example = styled(Link)`
  padding: ${pxToRem(2, 6)};
  border-radius: ${pxToRem(4)};
  background-color: ${({ theme }) => theme.color.BROWN_DARK};
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSize.sm};
  color: ${({ theme }) => theme.color.WHITE};

  & sup {
    font-size: ${({ theme }) => theme.fontSize.custom('xs', -2)};
    vertical-align: super;
  }

  &:hover {
    background-color: ${({ theme }) => theme.color.BROWN};
  }

  @media ${({ theme }) => theme.media.mobile} {
    font-size: ${({ theme }) => theme.fontSize.xs};

    & sup {
      font-size: ${({ theme }) => theme.fontSize.custom('xs', -4)};
    }
  }
`;

function POSItem({ id, title, text, examples, exampleOrders }: POSItemProps) {
  const { langId } = useLanguage();

  return (
    <Container>
      <Content>
        <Title>{title}</Title>
        {text ? <Text>{text}</Text> : null}
        {examples.length ? (
          <ExampleList>
            {examples.map((example, index) => {
              const order = exampleOrders[index];
              return (
                <Example
                  key={`${langId}-pos-example-${example}-${order}`}
                  to={`/${langId}/voca?word=${example}&order=${order}`}
                >
                  {example}
                  <sup>
                    {(exampleOrders[index] ?? 0) > 1
                      ? exampleOrders[index]
                      : ''}
                  </sup>
                </Example>
              );
            })}
          </ExampleList>
        ) : null}
      </Content>
      <EllipsisMenu id={id} name={title} />
    </Container>
  );
}

export default POSItem;
