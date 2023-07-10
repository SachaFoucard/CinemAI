import { View, Text, StyleSheet,TouchableOpacity,ScrollView } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function PrivacyPolicy({navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
       
        <TouchableOpacity style={styles.header}  onPress={() => { navigation.navigate('TabMenu')}}>
        <Ionicons  style={styles.icon}  name="chevron-back-outline"/>
        <Text style={styles.title}>Privacy Policy</Text>
        </TouchableOpacity>
       

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types of Data We Collect</Text>
        <Text style={styles.sectionText}>
          We may collect the following types of personal data:
          {"\n"}- Name
          {"\n"}- Email address
          {"\n"}- Phone number
          {"\n"}- Date of birth
          {"\n"}- Address
          {"\n"}- Payment information
          {"\n"}- IP address
          {"\n"}- Usage data
          {"\n"}- Cookies and tracking technologies
          {"\n"}- Geolocation data
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use of Your Personal Data</Text>
        <Text style={styles.sectionText}>
          We may use your personal data for the following purposes:
          {"\n"}- Providing and maintaining our services
          {"\n"}- Personalizing and improving our services
          {"\n"}- Communicating with you
          {"\n"}- Processing payments
          {"\n"}- Analyzing usage of our services
          {"\n"}- Protecting against fraud and unauthorized activity
          {"\n"}- Enforcing our terms and policies
          {"\n"}- Complying with legal obligations
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disclosure of Your Personal Data</Text>
        <Text style={styles.sectionText}>
          We may disclose your personal data to third parties in the following circumstances:
          {"\n"}- With your consent
          {"\n"}- To comply with legal obligations
          {"\n"}- To protect our rights and property
          {"\n"}- To prevent or investigate possible wrongdoing
          {"\n"}- In connection with a business transaction or acquisition
          {"\n"}- To service providers who assist us in operating our business
          {"\n"}- To analytics and marketing providers
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Retention</Text>
        <Text style={styles.sectionText}>
          We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Text style={styles.sectionText}>
          We take reasonable measures to protect your personal data against unauthorized access, disclosure, alteration, and destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rights</Text>
        <Text style={styles.sectionText}>
          You have the right to:
          {"\n"}- Access and receive a copy of your personal data
          {"\n"}- Update or correct your personal data
          {"\n"}- Object to the processing of your personal data
          {"\n"}- Request the deletion of your personal data
          {"\n"}- Restrict the processing of your personal data
          {"\n"}- Withdraw your consent, where applicable
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.sectionText}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions or concerns about our Privacy Policy, please contact us at privacy@example.com.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Data Retention</Text>
        <Text style={styles.sectionText}>
          We will retain your personal data for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        <Text style={styles.sectionText}>
          We take reasonable measures to protect your personal data against unauthorized access, disclosure, alteration, and destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Rights</Text>
        <Text style={styles.sectionText}>
          You have the right to:
          {"\n"}- Access and receive a copy of your personal data
          {"\n"}- Update or correct your personal data
          {"\n"}- Object to the processing of your personal data
          {"\n"}- Request the deletion of your personal data
          {"\n"}- Restrict the processing of your personal data
          {"\n"}- Withdraw your consent, where applicable
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.sectionText}>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions or concerns about our Privacy Policy, please contact us at CinemaAi@hotmail.com.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cookies Policy</Text>
        <Text style={styles.sectionText}>
          Our website uses cookies to enhance your browsing experience. By continuing to use our website, you consent to the use of cookies in accordance with our Cookie Policy.
        </Text>
      </View>

    </ScrollView>

    

    
  );
}

const styles = StyleSheet.create({
  container: {
    
    flexGrow: 1,//for scrolling through all the content
    backgroundColor: '#181A21',
    padding: 20,
  },
  header:{
    flexDirection:"row",
    marginTop:20,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  sectionText: {
    color: 'white',
    marginLeft: 10,
  },
  icon: {
    fontSize: 30,
    color: 'white',
  },
});