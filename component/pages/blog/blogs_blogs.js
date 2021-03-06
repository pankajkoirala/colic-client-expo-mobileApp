import moment from "moment";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  Dimensions,
  Image,
  Platform
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import HTML from "react-native-render-html";
import { base_URL } from "../../utils/const";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default Blogs_blogs = (props) => {
  const { blogs_blogs, pageNumber, callNextPage, callPrePage } = props;

  const contentWidth = useWindowDimensions().width;
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(9);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = blogs_blogs?.slice(indexOfFirstPost, indexOfLastPost);

  var { width, height } = Dimensions.get("window");

  return (
    <ScrollView
      bounces={false}
      style={{
        flex: 1,
        width: width,
        height: "100%",
      }}
    >
      <View style={Platform.OS === 'ios' ? styles.Category1ContainerIOS : styles.Category1ContainerAndroid}>
        {currentPost?.length ? (
          <View>
            {currentPost?.map((arg, i) => {
              return (
                <View key={i}>
                  {i === 0 ? (
                    <View>
                      <Image
                        style={styles.blogImg}
                        source={{
                          uri: `${base_URL}/${arg.photos[0]}`,
                        }}
                      />
                      <View style={styles.firstBlogBox}>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("SingleBlogView", {
                              id: arg.id,
                            })
                          }
                        >
                          <Text style={styles.blogTitle}> {arg.title}</Text>
                        </TouchableOpacity>

                        <HTML
                          tagsStyles={{
                            h1: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h2: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h3: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h4: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h5: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h6: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            b: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            p: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            img: {
                              display: "none",
                            },
                          }}
                          source={{ html: arg.content.slice(0, 150) }}
                          contentWidth={contentWidth}
                        />
                      </View>
                    </View>
                  ) : (
                    <View
                      key={i}
                      style={
                        i % 2 !== 0
                          ? styles.allBlogViewEven
                          : styles.allBlogViewOdd
                      }
                    >
                      <Image
                        style={styles.otherBlogImg}
                        source={{
                          uri: `${base_URL}/${arg.photos[0]}`,
                        }}
                      />
                      <View style={styles.otherBlogText}>
                        <Text style={styles.blogPostedDate}>
                          {moment(arg.posteddate).format("DD MMM YYYY")}
                        </Text>
                        <Text
                          onPress={() =>
                            props.navigation.navigate("SingleBlogView", {
                              id: arg.id,
                            })
                          }
                          style={styles.blogTitle}
                        >
                          {arg.title}
                        </Text>
                        <HTML
                          tagsStyles={{
                            h1: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h2: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h3: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h4: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h5: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            h6: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            b: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            p: {
                              textAlign: "justify",
                              width: "100%",
                            },
                            img: {
                              display: "none",
                            },
                          }}
                          source={{ html: arg.content.slice(0, 150) }}
                        />
                      </View>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        ) : (
          <View style={{ height: height - height * 0.30 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                paddingTop: 30,
                textAlign: "center",
              }}
            >
              No Blogs Found
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => callPrePage()}
            style={styles.nextPre}
          >
            <FontAwesome5 name="chevron-left" size={25} />
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              height: 32,
              width: 32,
              backgroundColor: "#ffb84d",

              marginHorizontal: 4,
              borderRadius: 4,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 30,
                fontWeight: "bold",
              }}
            >
              {pageNumber}
            </Text>
          </View>
          <TouchableOpacity
            disabled={!currentPost.length}
            onPress={() => callNextPage()}
            style={styles.nextPre}
          >
            <FontAwesome5 name="chevron-right" size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Category1ContainerIOS: {
    // flex: 1,
    paddingTop: 10,
    // paddingBottom: 130,
  },
  Category1ContainerAndroid: {
    // flex: 1,
    paddingTop: 10,
    // paddingBottom: 130,
  },
  allBlogViewEven: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 18,
    backgroundColor: "#e6e6e6",
    margin: 4,
    borderRadius: 10,
  },
  allBlogViewOdd: {
    flexDirection: "row-reverse",
    paddingHorizontal: 12,
    paddingVertical: 18,
    backgroundColor: "#e6e6e6",
    margin: 4,
    borderRadius: 10,
  },
  blogPostedDate: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#999966",
  },
  blogTitle: {
    paddingBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#4d4d33",
    textTransform: "capitalize",
  },
  blogContant: {
    textTransform: "capitalize",
    textAlign: "justify",
  },
  blogAuthor: {
    textTransform: "capitalize",
  },
  blogSource: {
    textTransform: "capitalize",
  },
  blogImg: {
    height: 200,
    width: "100%",
  },
  firstBlogBox: {
    alignSelf: "center",
    backgroundColor: "white",
    marginTop: -30,
    marginBottom: 16,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    width: "80%",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  otherBlogImg: {
    height: 220,
    marginRight: 2,
    width: "50%",
    borderRadius: 8,
  },
  otherBlogText: {
    width: "50%",
    // height: 200,
    overflow: 'hidden',
    marginRight: 4,
    marginLeft: 2,
  },
  nextPre: {
    height: 32,
    width: 32,
    backgroundColor: "#ffe0b3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginHorizontal: 4,
  },
});
