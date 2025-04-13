import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../config';
import LoadingIndicator from '../components/LoadingIndicator';

// Mock data for ingredients
const MOCK_INGREDIENTS = [
  {
    id: '1',
    name: 'Organic Chicken Breast',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791',
    price: 12.99,
    unit: 'lb',
    quantity: 2,
    affiliateLink: 'https://example.com/chicken',
    influencer: {
      name: 'Fitness Chef',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    meal: 'Protein-Packed Breakfast Bowl'
  },
  {
    id: '2',
    name: 'Organic Quinoa',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac',
    price: 5.99,
    unit: 'lb',
    quantity: 1,
    affiliateLink: 'https://example.com/quinoa',
    influencer: {
      name: 'Nutrition Guru',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    meal: 'Green Smoothie Bowl'
  },
  {
    id: '3',
    name: 'Wild Caught Salmon',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
    price: 15.99,
    unit: 'lb',
    quantity: 1,
    affiliateLink: 'https://example.com/salmon',
    influencer: {
      name: 'Healthy Eats',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    meal: '15-Minute Salmon Bowl'
  },
  {
    id: '4',
    name: 'Organic Avocados',
    image: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad',
    price: 2.49,
    unit: 'each',
    quantity: 3,
    affiliateLink: 'https://example.com/avocado',
    influencer: {
      name: 'Healthy Eats',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    meal: '15-Minute Salmon Bowl'
  },
  {
    id: '5',
    name: 'Organic Blueberries',
    image: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e',
    price: 4.99,
    unit: 'pint',
    quantity: 1,
    affiliateLink: 'https://example.com/blueberries',
    influencer: {
      name: 'Nutrition Guru',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    meal: 'Green Smoothie Bowl'
  }
];

const OrderIngredientsScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [ingredients, setIngredients] = useState([]);
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(5.99);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Simulate API call to fetch ingredients
    const fetchIngredients = async () => {
      try {
        // In a real app, this would be an API call
        setTimeout(() => {
          setIngredients(MOCK_INGREDIENTS);
          setCart(MOCK_INGREDIENTS.map(item => ({ ...item })));
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  useEffect(() => {
    // Calculate totals
    const newSubtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);

    const newDiscount = promoApplied ? newSubtotal * 0.1 : 0;
    setDiscount(newDiscount);

    setTotal(newSubtotal - newDiscount + shipping);
  }, [cart, promoApplied]);

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'fitfoodie10') {
      setPromoApplied(true);
      Alert.alert('Success', '10% discount applied!');
    } else {
      Alert.alert('Invalid Code', 'Please enter a valid promo code.');
    }
  };

  const checkout = () => {
    Alert.alert(
      'Checkout',
      'This would proceed to checkout in a real app.',
      [{ text: 'OK' }]
    );
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <View style={styles.influencerRow}>
          <Image source={{ uri: item.influencer.avatar }} style={styles.influencerAvatar} />
          <Text style={styles.influencerName}>{item.influencer.name}</Text>
        </View>
        <Text style={styles.mealName}>For: {item.meal}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)} / {item.unit}</Text>
      </View>

      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, -1)}
        >
          <Ionicons name="remove" size={16} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>

        <Text style={styles.quantityText}>{item.quantity}</Text>

        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Ionicons name="add" size={16} color={THEME.COLORS.TEXT} />
        </TouchableOpacity>
      </View>

      <Text style={styles.itemTotal}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Order Ingredients</Text>
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color={THEME.COLORS.TEXT_SECONDARY} />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => navigation.navigate('MealPlans')}
          >
            <Text style={styles.browseButtonText}>Browse Meal Plans</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.cartContainer}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />

          <View style={styles.orderSummary}>
            <Text style={styles.summaryTitle}>Order Summary</Text>

            <View style={styles.promoContainer}>
              <TextInput
                style={styles.promoInput}
                placeholder="Promo Code"
                value={promoCode}
                onChangeText={setPromoCode}
              />
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  promoApplied && styles.appliedButton
                ]}
                onPress={applyPromoCode}
                disabled={promoApplied}
              >
                <Text style={styles.applyButtonText}>
                  {promoApplied ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>

            {promoApplied && (
              <View style={styles.summaryRow}>
                <Text style={styles.discountLabel}>Discount (10%)</Text>
                <Text style={styles.discountValue}>-${discount.toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>

            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={checkout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>

            <Text style={styles.affiliateDisclaimer}>
              * Purchases made through affiliate links support your favorite influencers
            </Text>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLORS.BACKGROUND,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    backgroundColor: THEME.COLORS.CARD,
  },
  headerTitle: {
    fontSize: THEME.SIZES.TITLE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: THEME.SIZES.LARGE,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginTop: 16,
    marginBottom: 24,
  },
  browseButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
  },
  browseButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cartContainer: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.COLORS.CARD,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 4,
  },
  influencerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  influencerAvatar: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 4,
  },
  influencerName: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  mealName: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginHorizontal: 8,
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    minWidth: 60,
    textAlign: 'right',
  },
  separator: {
    height: 12,
  },
  orderSummary: {
    backgroundColor: THEME.COLORS.CARD,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
    marginBottom: 16,
  },
  promoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  promoInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingHorizontal: 16,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: THEME.COLORS.SUCCESS,
  },
  applyButtonText: {
    fontSize: THEME.SIZES.SMALL,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.TEXT_SECONDARY,
  },
  summaryValue: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  discountLabel: {
    fontSize: THEME.SIZES.MEDIUM,
    color: THEME.COLORS.SUCCESS,
  },
  discountValue: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: THEME.COLORS.SUCCESS,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 8,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.TEXT,
  },
  totalValue: {
    fontSize: THEME.SIZES.LARGE,
    fontWeight: 'bold',
    color: THEME.COLORS.PRIMARY,
  },
  checkoutButton: {
    backgroundColor: THEME.COLORS.PRIMARY,
    paddingVertical: 12,
    borderRadius: THEME.BORDER_RADIUS.MEDIUM,
    alignItems: 'center',
    marginBottom: 12,
  },
  checkoutButtonText: {
    fontSize: THEME.SIZES.MEDIUM,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  affiliateDisclaimer: {
    fontSize: THEME.SIZES.SMALL,
    color: THEME.COLORS.TEXT_SECONDARY,
    textAlign: 'center',
    fontStyle: 'italic',
  },

});

export default OrderIngredientsScreen;
