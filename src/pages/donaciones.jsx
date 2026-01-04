import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './TextHighlighter.module.css'; // CSS module for scoped styles


const Donaciones = () => {

  return (
    <Layout title="Coloreador Sintáctico" description="Coloreador Sintáctico">
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <article style={{ width: '80em' }}>
          <h1>Donaciones</h1>

         <br />

            {/* <h3 style={{ textAlign: "center"}} >Alias (MercadoPago, BNA, Etc) </h3>

            <p style={{ textAlign: "center", fontSize: "130%"}} >foco.tono.llave</p> */}

          <h3 style={{ textAlign: "center"}} >Invitame Un Cafecito</h3>

          <p style={{ textAlign: "center" }} ><a href='https://cafecito.app/armonia-expuesta' rel='noopener' target='_blank'><img srcset='https://cdn.cafecito.app/imgs/buttons/button_3.png 1x, https://cdn.cafecito.app/imgs/buttons/button_3_2x.png 2x, https://cdn.cafecito.app/imgs/buttons/button_3_3.75x.png 3.75x' src='https://cdn.cafecito.app/imgs/buttons/button_3.png' alt='Invitame un café en cafecito.app' /></a></p>
          <h3 style={{ textAlign: "center"}} >PayPal</h3>


          <form style={{ textAlign: "center"}} action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="MAUUB94Q4AU7Q" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt="" border="0" src="https://www.paypal.com/en_AR/i/scr/pixel.gif" width="1" height="1" />
</form>

                    <h3 style={{ textAlign: "center"}} >Ethereum Polygon</h3>

          <p style={{ textAlign: "center", fontSize: "130%"}} >541461651565647865167457</p>

        </article>
      </div>
    </Layout>
  );
}

export default Donaciones;