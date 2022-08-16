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

class SelectBetVendorScreen extends Component {
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
          <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>1Xbet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0 }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>1960 Bet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>360 Bet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Bangbet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Betfarm</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Bet9ja</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Betway</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Megabet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Merrybet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Super Lotto</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Winner Golden Bet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Western Lotto</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Zeus</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>Access Bet</Text>
                </View>
                <View style={{ marginEnd: 5, marginStart: 5, marginVertical: 5, bottom: 0  }}>
                <IconArrow/>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionContainer} onPress={()=> this.props.navigation.navigate("BillPaymentBet")}>
                <View>
                <Text style={{ fontSize: 16, color: "#002A14", fontWeight: "400" }}>BetKing</Text>
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


export default SelectBetVendorScreen;

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
