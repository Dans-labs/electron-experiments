import * as React from 'react'
import Foldable from "./Foldable"

const FoldableTexts = () => {
    return <div>
        <Foldable title="Foldable 1" defaultOpened required>
            <h2>First foldable pane</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eu congue enim, vestibulum
                ullamcorper lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per
                inceptos himenaeos. Pellentesque eu nunc blandit, tristique turpis a, lobortis elit. Sed
                gravida mattis lacus, at gravida est facilisis sed. Fusce pharetra id mauris vitae dapibus.
                Integer imperdiet finibus felis, ut volutpat massa pellentesque nec. Sed ac lacus dictum,
                lobortis nibh sed, aliquam augue. Curabitur orci est, hendrerit sit amet ipsum non, egestas
                ornare nunc. Morbi pretium volutpat nulla at molestie. In sit amet pellentesque erat.
                Nullam placerat tempor malesuada. Sed aliquam porttitor pharetra. Curabitur a nisi velit.</p>
        </Foldable>

        <Foldable title="Foldable 2" recommended>
            <h2>Second foldable pane</h2>
            <p>Donec ut enim eget leo mattis gravida. Fusce iaculis felis ut pulvinar consectetur. Mauris
                tincidunt enim vitae laoreet venenatis. Mauris sit amet egestas lectus. Proin non ipsum et
                lorem maximus accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Donec at sem ipsum. Fusce nibh mi, rhoncus sed ipsum vel, porta fermentum lectus. Etiam
                gravida congue odio vel mollis. Donec ac velit eget erat imperdiet rhoncus.</p>
        </Foldable>

        <Foldable title="Foldable 3">
            <h2>Third foldable pane</h2>
            <p>Aenean eu lacus sit amet arcu rhoncus laoreet ut dapibus ante. Nunc eu nunc nulla. Phasellus eget
                accumsan enim. Quisque vitae euismod ipsum, lacinia placerat risus. Pellentesque at odio et ex
                aliquam bibendum. Ut consectetur euismod dui, ut euismod metus condimentum vitae. Mauris a lectus
                magna. Nam tincidunt nisl quis pharetra consectetur. Phasellus volutpat condimentum dolor sit amet
                ultrices. In ex dui, euismod in arcu quis, luctus tincidunt erat.</p>
        </Foldable>
    </div>
}

export default FoldableTexts
