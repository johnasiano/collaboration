export const getCardPrice = (card, currencyUnit) => {
    
    let card_price = null;
    if (card.tcg_avg_usd_low != null) {
      card_price = Number(card.tcg_avg_usd_low);
    } else {
      if (card.ebayca_avg_usd_low != null) {
        card_price = Number(card.ebayca_avg_usd_low);
      }
    }
    
    if (card_price!==null) {
      card_price = (currencyUnit === 'USD' ? card_price: card_price*1.32);
    }  

    if (card_price===null) {
      card_price = 0;
    } else {
      if (card.set_rarity === 'Common') {
        if (card_price >= 0 && card_price <= 1.25) {
          card_price = 0.49;
        } else {
          let _roundPrice = Math.round(card_price);
          if (parseInt(card_price)===_roundPrice) {
            card_price = _roundPrice + 0.49;
          } else {
            card_price = _roundPrice - 0.05;
          }
        }
      } else {
        if (card_price >= 0 && card_price <= 0.4) {
          card_price = 0.25;
        } else if (card_price > 0.4 && card_price <= 0.99) {
          card_price = 0.95;
        } else {
          let _roundPrice = Math.round(card_price);
          if (parseInt(card_price)===_roundPrice) {
            card_price = _roundPrice + 0.49;
          } else {
            card_price = _roundPrice - 0.05;
          }
        }
      }    
    }    
    return card_price.toFixed(2);
  }
  