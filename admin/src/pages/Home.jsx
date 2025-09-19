import DashboardCharts from "../components/DashboardCharts "
import DashboardWidgets from "../components/DashboardWidgets"
import RecentSales from "../components/RecentSales "
import SalesRevenue from "../components/Salesrevenue"
import Footer from "../components/Footer"
function Home(){
    return(
  <>
  
     <SalesRevenue/>
     <DashboardCharts/>
     <RecentSales/>
     <DashboardWidgets/>
     <Footer/>
  
  </>
   
     
    )
}
export default Home