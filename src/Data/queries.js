import { gql } from "@apollo/client";

// Querry calls for Apollo server and GraphQl
export const CATEGORIES = gql`
  query {
    categories {
      name
    }
  }
`;

export const CategoryProducts = gql`
  query ($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        id
        name
        gallery
        inStock
        attributes {
          id
          name
          type
          items {
            id
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
      }
    }
  }
`;

export const Product = gql`
  query ($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const ProductAttributes = gql`
  query ($id: String!) {
    attributeSet(id: $id) {
      id
      name
      type
      items {
        id
        name
        type
        value
      }
    }
  }
`;

export const Currency = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
