import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
  LogBox,
} from "react-native";
import  Loader  from '../config/Loader';
import IconArrow from '../assets/svgs/iconarrow';

const { width, height } = Dimensions.get("window");

const initialState = { 
  isLoading: false, 
};

class SelectCableSubScreen extends Component {
  state = initialState;

  render() {
    LogBox.ignoreAllLogs(true);

    return (
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="always">
          
          <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
          <Loader loading={this.state.isLoading} />
          <View style={{ marginVertical: 30 }}>
          <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>DSTV Subscription</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0 }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>GoTV</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Startimes Payments</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Play Subscription</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>DSTV Box Office Wallet Top Up</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentCable")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>DAARSAT Communication</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>
            </View>
        </ScrollView>
    );
  }
}


export default SelectCableSubScreen;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: width,
  },
  optionContainer: {
      borderRadius: 13,
      width: width * 0.9,
      height: 80,
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 16,
      padding: 10,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFFF",
  },
});
