import { gql } from "@apollo/client";

// Querry calls for Apollo server and GraphQl
export const CATEGORY = gql`
  query {
    categories {
      name
      products {
        id
        name
        gallery
        inStock
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
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
