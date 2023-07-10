import { StyleSheet, Text, View,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState,useContext} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { UserContext } from '../../context/UserContext';

const HelpCenter = ({ navigation }) => {
    
const { highlighted,handlePress } = useContext(UserContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
          <TouchableOpacity style={styles.header}  onPress={()=>navigation.navigate('profile')}>
            <Ionicons  style={styles.icon}  name="chevron-back-outline"/>
            <Text style={styles.title}>Help Center</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.choice}>
            <View style={styles.leftOption}>
                <Text style={[styles.textOption,highlighted === 'FAQ' && styles.highlightedOption,]} onPress={() => handlePress('FAQ')}> FAQ</Text>
                {highlighted === 'FAQ' && <View style={styles.glowingLine} />}
            </View>
            <View style={styles.rightOption}>
                <Text style={[styles.textOption,highlighted === 'Contact Us' && styles.highlightedOption,]}onPress={() => handlePress('Contact Us')}> Contact Us</Text>
                {highlighted === 'Contact Us' && <View style={styles.glowingLine} />}
            </View>
          </TouchableOpacity>


          {highlighted === 'Contact Us' && (
        <View style={styles.contact}>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="headset-outline" />
            <Text style={styles.titleContact}>Customer Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="logo-whatsapp" />
            <Text style={styles.titleContact}>Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="globe-outline" />
            <Text style={styles.titleContact}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="logo-facebook" />
            <Text style={styles.titleContact}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="logo-twitter" />
            <Text style={styles.titleContact}>Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerContact} onPress={() => navigation.navigate('profile')}>
            <Ionicons style={styles.icon} name="logo-instagram" />
            <Text style={styles.titleContact}>Instagram</Text>
          </TouchableOpacity>
        </View>
        )}


{highlighted === 'FAQ' && (
        <View style={styles.faq}>
          <Text style={styles.faqQuestion}>What is CinemaAi?</Text>
          <Text style={styles.faqAnswer}>
            CinemaAi is an app that allows you to watch trailers of movies and series. You can also add them to your favorites.
          </Text>
          <Text style={styles.faqQuestion}>How can I watch a movie or series trailer?</Text>
          <Text style={styles.faqAnswer}>
            To watch a trailer, simply browse the app and select the movie or series you're interested in. The trailer will be available for viewing on the details page.
          </Text>
          <Text style={styles.faqQuestion}>How do I add a movie or series to my favorites?</Text>
          <Text style={styles.faqAnswer}>
            To add a movie or series to your favorites, navigate to the details page of the desired content and tap the "Add to Favorites" button. The content will be saved in your favorites for easy access.
          </Text>
          {/* Add more FAQ questions and answers here */}
          <Text style={styles.faqQuestion}>Can I download trailers for offline viewing?</Text>
          <Text style={styles.faqAnswer}>
            Currently, the app does not support downloading trailers for offline viewing. However, you can watch the trailers while connected to the internet.
          </Text>
          <Text style={styles.faqQuestion}>How often are new trailers added to the app?</Text>
          <Text style={styles.faqAnswer}>
            New trailers are added regularly to the app. We strive to keep the content up to date with the latest movie and series releases.
          </Text>
          <Text style={styles.faqQuestion}>Can I request specific movies or series to be added?</Text>
          <Text style={styles.faqAnswer}>
            We welcome your suggestions! If there's a specific movie or series you'd like to see on the app, please reach out to our support team with your request.
          </Text>
          {/* ... */}
        </View>
      )}

         
    </ScrollView>
  )
}

export default HelpCenter

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#181A21',
        padding: 20,
      },
      header: {
        flexDirection: 'row',
        margin: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left', // Align the text to the left 
        padding:10,  
      },
      headerContact: {
        flexDirection: 'row',
        margin: 15,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left', // Align the text to the left
        backgroundColor:"#2D353A",
        padding:10,
        borderRadius:15,
      },
      icon: {
        fontSize: 30,
        color: 'red',
        
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginLeft:10,
      },
      titleContact: {
        fontSize: 20,
        color: 'white',
        marginLeft:10,
      },
      choice: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },
      leftOption: {
        flex: 1,
        alignItems:"center",
        position: 'relative',
      },
      rightOption: {
        flex: 1,
        alignItems:"center",
        position: 'relative',
      },
      textOption: {
        color: 'white',
        fontSize: 20,
      },
      highlightedOption: {
        color: 'red',
      },
      glowingLine: {
        position: 'absolute',
        bottom: -2,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: 'red',
        opacity: 0.5,
       
      },

      faq: {
        marginTop: 20,
        marginBottom:20,
      },
      faqQuestion: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
      },
      faqAnswer: {
        fontSize: 16,
        color: 'white',
        marginBottom: 20,
      },
      contact:{
       
      }
})
